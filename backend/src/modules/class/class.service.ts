import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { Sequelize } from 'sequelize-typescript';
import { CourseService } from '../course/course.service';
import { InjectModel } from '@nestjs/sequelize';
import { Class, Course, StudentClass, TeacherClass } from 'src/models';
import { FilterClassDto } from './dto/filter-class.dto';
import { Op } from 'sequelize';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClassService {
    constructor(
        private readonly sequelize: Sequelize,
        private readonly configService: ConfigService,
        private readonly courseService: CourseService,
        @InjectModel(Class) private readonly classModel: typeof Class,
        @InjectModel(TeacherClass) private readonly teacherClassModel: typeof TeacherClass,
    ) { }

    private async checkPermission(id: number, account) {
        if (account.role === 'teacher') {
            const teacherClass = await this.teacherClassModel.findOne({
                where: {
                    classId: id,
                    teacherId: account.id
                }
            });
            if (!teacherClass) {
                throw new ForbiddenException('Bạn không thể thao tác với lớp này');
            }
        }
    }

    async findOne(id: number, account) {
        await this.checkPermission(id, account)
        return this.classModel.findOne({
            include: [
                {
                    model: StudentClass,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id', 'classId'],
                    }
                },
                {
                    model: Course,
                    attributes: ['name'],
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'courseId']
            },
            where: {
                id,
                isOpened: true
            }
        });
    }

    async create(createClassDto: CreateClassDto) {
        const t = await this.sequelize.transaction();
        try {
            const course = await this.courseService.findOne(createClassDto.courseId);
            if (!course) {
                throw new BadRequestException('Khóa học không tồn tại')
            }
            const newClass = await this.classModel.create(createClassDto as any, { transaction: t });
            await t.commit();
            return {
                message: 'Tạo lớp học thành công',
                data: newClass,
            }

        } catch (error) {
            const message = error.message || 'Tạo lớp học thất bại'
            await t.rollback();
            throw new BadRequestException(message);
        }
    }

    async findAll(filterClasssDto: FilterClassDto) {
        const {
            search,
            isOpened,
            courseId,
            page,
            limit,
            sortBy,
            sortOrder,
            soonest,
            latest
        } = filterClasssDto;

        const whereClause: any = {}
        if (search !== undefined) {
            whereClause[Op.or] = [
                { classRoom: { [Op.like]: `%${search}%` } },
            ];
        }

        if (isOpened !== undefined) whereClause.isOpened = isOpened;
        if (courseId !== undefined) whereClause.courseId = courseId;

        const limitPage = Number(limit || this.configService.get<number>('LIMIT_CLASS'));
        const currentPage = Number(page || 1);
        const offset = (currentPage - 1) * limitPage;

        if (soonest !== undefined || latest !== undefined) {
            whereClause.openingDate = {}
            if (soonest !== undefined) whereClause.openingDate[Op.gte] = soonest;
            if (latest !== undefined) whereClause.openingDate[Op.lte] = latest;
        }

        let orderClause: any[] = [];
        if (sortBy && sortOrder) {
            orderClause = [[sortBy, sortOrder]];
        } else {
            orderClause = [['openingDate', 'ASC']]
        }

        const { rows, count } = await this.classModel.findAndCountAll({
            where: whereClause,
            order: orderClause,
            limit: limitPage,
            offset,
            raw: true
        });
        const totalItems = Array.isArray(count) ? count.length : count;

        return {
            items: rows,
            paginationMeta: {
                current: currentPage,
                limit: limitPage,
                pages: Math.ceil(totalItems / limitPage),
                total: totalItems
            }
        };
    }

    async removeHard(id: number) {
        await this.classModel.destroy({
            where: { id },
            cascade: true
        });
        return { message: 'Xóa lớp thành công' };
    }

    async removeSoft(id: number, account) {
        await this.checkPermission(id, account);
        await this.classModel.update(
            { isOpened: false },
            { where: { id } }
        );
        return { message: 'Đóng lớp thành công' };
    }
}
