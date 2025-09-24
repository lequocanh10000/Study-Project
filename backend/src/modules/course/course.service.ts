import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Class, Course } from 'src/models';
import { CreateCourseDto } from './dto/create-course.dto';
import { FilterCourseDto } from './dto/filter-course.dto';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { Op } from 'sequelize';

@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Course) private readonly courseModel: typeof Course,
        private readonly sequelize: Sequelize,
        private readonly configService: ConfigService
    ) { }

    async createCourse(createCourseDto: CreateCourseDto) {
        const courseExists = await this.courseModel.findOne({
            where: { name: createCourseDto.name },
        })
        if (courseExists) {
            throw new BadRequestException('Khóa học đã tồn tại');
        }
        await this.courseModel.create(createCourseDto as any)
        return {
            message: 'Tạo khóa học thành công'
        }
    }

    async findAll(filterCourseDto: FilterCourseDto) {
        const {
            search,
            page,
            limit,
            sortBy,
            sortOrder,
            minSessions,
            maxSessions
        } = filterCourseDto;

        const whereClause: any = {};

        if (search != undefined) {
            whereClause[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
            ];
        }

        const limitPage = Number(limit || this.configService.get<number>('LIMIT_COURSE'));
        const currentPage = Number(page || 1);
        const offset = (currentPage - 1) * limitPage;

        if(minSessions !== undefined || maxSessions !== undefined) {
            whereClause.expYear = {}
            if(minSessions !== undefined) whereClause.expYear[Op.gte] = minSessions;
            if(maxSessions !== undefined) whereClause.expYear[Op.lte] = maxSessions;
        }

        let orderClause: any[] = [];
        if (sortBy && sortOrder) {
            orderClause = [[sortBy, sortOrder]];
        } else {
            orderClause = [[this.sequelize.literal("SUBSTRING_INDEX(name, ' ', -1)"), "ASC"]];
        }

        const { rows, count } = await this.courseModel.findAndCountAll({
            where: whereClause,
            order: orderClause,
            limit: limitPage,
            offset,
            raw: true,
        });
        const totalItems = Array.isArray(count) ? count.length : count;

        return {
            items: rows,
            paginationMeta: {
                current: currentPage,
                limit: limitPage,
                pages: Math.ceil(totalItems / limitPage),
                total: totalItems,
            }
        };
    }

    async findOne(id: number) {
        return await this.courseModel.findOne({
            include: [
                {
                    model: Class,
                    attributes: ['classRoom', 'openingDate']
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                id
            }
        });
    }

    async delete(id: number) {
        await this.courseModel.destroy({ where: { id }, cascade: true });
        return { message: 'Xoá thông tin khóa học thành công' };
    }
}
