import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Class, Student, StudentClass } from 'src/models';
import { CreateStudentDto, StudentClassDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Sequelize } from 'sequelize-typescript';
import { FilterStudentDto } from './dto/filter-student.dto';
import { Op } from 'sequelize';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student) private readonly studentModel: typeof Student,
        @InjectModel(StudentClass) private readonly studentClassModel: typeof StudentClass, 
        @InjectModel(Class) private readonly classModel: typeof Class,
        private readonly sequelize: Sequelize,
        private readonly configService: ConfigService
    ) {}

    async createStudent(createStudentDto: CreateStudentDto) {
        const t = await this.sequelize.transaction();
        try {
            const emailExists = await this.studentModel.findOne({
                where: { email: createStudentDto.email},
            })
            const phoneExists = await this.studentModel.findOne({
                where: { phone: createStudentDto.phone},
            })
            if(emailExists || phoneExists) throw new BadRequestException('Email hoặc số điện thoại đã tồn tại');
            const newStudent = await this.studentModel.create(createStudentDto as any);

            // Xếp lớp
            if(createStudentDto.studentClasses && createStudentDto.studentClasses.length > 0 && newStudent) {
                const studentId = newStudent.id || newStudent.dataValues?.id;
                const classIds = createStudentDto.studentClasses.map((studentClass: StudentClassDto) => studentClass.classId);
                const alreadyExists = await this.classModel.findAll({
                    where: {
                        id: classIds,
                    },
                    attributes: ['id']
                })
                if(alreadyExists.length !== createStudentDto.studentClasses.length) {
                    throw new BadRequestException('Lớp học không tồn tại')
                }
                const studentClasses = createStudentDto.studentClasses.map((studentClass) => ({
                    ...studentClass,
                    studentId,
                }));
                await this.studentClassModel.bulkCreate(studentClasses as any, {transaction: t});
            }
            await t.commit();
            return {
                message: 'Tạo học sinh thành công'
            }
        } catch(error) {
            const message = error.message || 'Tạo học sinh thất bại'
            await t.rollback();
            throw new BadRequestException(message);
        }
    }

    async findAll(filterStudentDto: FilterStudentDto) {
        const {
            search,
            classId,
            page,
            limit,
            sortBy,
            sortOrder
        } = filterStudentDto;

        const whereClause: any = {};

        if(search != undefined) {
            whereClause[Op.or] = [
                {fullName: {[Op.like]: `%${search}%`}},
            ];
        }

        if(classId !== undefined) whereClause.classId = classId;

        const limitPage = Number(limit || this.configService.get<number>('LIMIT_STUDENT'));
        const currentPage = Number(page || 1);
        const offset = (currentPage - 1) * limitPage;

        let orderClause: any[] = [];
        if(sortBy && sortOrder) {
            orderClause = [[sortBy, sortOrder]];
        } else {
            orderClause = [[this.sequelize.literal("SUBSTRING_INDEX(fullName, ' ', -1)"), "ASC"]];
        }

        const {rows, count} = await this.studentModel.findAndCountAll({
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
        return await this.studentModel.findOne({
            include: [
                {
                    model: StudentClass,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id', 'studentId'],
                    },
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

    async update(updateStudentDto: UpdateStudentDto, id: number) {
        const alreadyExists = await this.studentModel.findByPk(id);
        if(!alreadyExists) throw new BadRequestException('Không tìm thấy học sinh');
        const updated = await this.studentModel.update(updateStudentDto as any, { where: {id }});
        const message = updated[0] > 0 ? 'Thông tin học sinh được cập nhật thành công' : 'Cập nhật thông tin học sinh không thành công';
        return { message}
    }

    async delete (id: number) {
        await this.studentModel.destroy({ where: { id}, cascade: true });
        return {message: 'Xoá thông tin học sinh thành công'};
    }
}
