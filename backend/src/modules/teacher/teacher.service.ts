import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher, TeacherClass } from 'src/models';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import Helper from 'src/utils/helpers';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FilterTeacherDto } from './dto/filter-teacher.dto';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class TeacherService {
    constructor(
        @InjectModel(Teacher) private readonly teacherModel: typeof Teacher,
        private readonly sequelize: Sequelize,
        private readonly configService: ConfigService,
    ) {}

    private checkPermission(teacherId: number, account) {
        if(teacherId === account.id) return;
        if(account.role === 'admin') return;
        throw new BadRequestException('Bạn không thực hiện được hành động này');
    }

    async findByEmailOrPhone(email: string, phone: string) {
        return await this.teacherModel.findOne({ where: { email}}) || 
            await this.teacherModel.findOne({ where: { phone }});
    }

    async findByEmail(email: string) {
        return await this.teacherModel.findOne({ where: { email }});
    }

    async register(createTeacherDto: CreateTeacherDto) {
        const teacher = await this.findByEmailOrPhone(createTeacherDto.email, createTeacherDto.phone);
        if(teacher) {
            throw new BadRequestException('Email hoặc số điện thoại đã được sử dụng');
        }
        const password = Helper.generateRandomString(8);
        const payload = {
            ...createTeacherDto,
            password: password
        }
        await this.teacherModel.create(payload as any);
        return {
            message: 'Thêm giáo viên thành công',
            password: payload.password
        }
    }

    async changePassword(changePasswordDto: ChangePasswordDto) {
        const alreadyExists = await this.findByEmail(changePasswordDto.email);
        if(!alreadyExists) throw new BadRequestException('Không tìm thấy giáo viên');
        if(changePasswordDto.password !== changePasswordDto.confirmPassword) {
            throw new BadRequestException('Mật khẩu xác nhận không khớp');
        }
        const updated = await this.teacherModel.update(
            { password: changePasswordDto.password },
            { where: { id: alreadyExists.id} }
        );
        const message = updated[0] > 0 ? 'Đổi mật khẩu thành công' : 'Đổi mật khẩu không thành công';
        const newPassword = updated[0] > 0 ? changePasswordDto.password : null;
        return {
            message: message,
            newPassword: newPassword,
        }
    }

    async validateTeacher(email: string, password: string) {
        const teacher = await this.findByEmail(email);
        if(!teacher) {
            throw new BadRequestException('Không tìm thấy giáo viên');
        }
        const isCorrectPassword = teacher.comparePassword(password);
        if(!isCorrectPassword) {
            throw new BadRequestException('Sai mật khẩu');
        }
        return {
            id: teacher.id,
            email: email,
            role: 'teacher'
        };
    }

    async findOne(teacherId: number, account) {
        this.checkPermission(teacherId, account);
        return await this.teacherModel.findOne({
            include: [
                {
                    model: TeacherClass,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id', 'teacherId'],
                    }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            },
            where: {
                id: teacherId
            }
        });
    }

    async findAll(filterTeacherDto: FilterTeacherDto) {
        const {
            search,
            classId,
            page,
            limit,
            sortBy,
            sortOrder,
            minExpYear,
            maxExpYear,
        } = filterTeacherDto;

        const whereClause: any = {};

        if(search != undefined) {
            whereClause[Op.or] = [
                {fullName: {[Op.like]: `%${search}%`}},
            ];
        }

        if(classId !== undefined) whereClause.classId = classId;

        const limitPage = Number(limit || this.configService.get<number>('LIMIT_TEACHER'));
        const currentPage = Number(page || 1);
        const offset = (currentPage - 1) * limitPage;

        if(minExpYear !== undefined || maxExpYear !== undefined) {
            whereClause.expYear = {}
            if(minExpYear !== undefined) whereClause.expYear[Op.gte] = minExpYear;
            if(maxExpYear !== undefined) whereClause.expYear[Op.lte] = maxExpYear;
        }

        let orderClause: any[] = [];
        if(sortBy && sortOrder) {
            orderClause = [[sortBy, sortOrder]];
        } else {
            orderClause = [[this.sequelize.literal("SUBSTRING_INDEX(fullName, ' ', -1)"), "ASC"]];
        }

        const {rows, count} = await this.teacherModel.findAndCountAll({
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

    async delete(id: number) {
        await this.teacherModel.destroy({
            where: {id},
            cascade: true
        })
        return {message: 'Xóa giáo viên thành công'}
    }
}
