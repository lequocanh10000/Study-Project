import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from 'src/models';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import Helper from 'src/utils/helpers';
import { ChangePasswordDto } from './dto/change-password.dto';


@Injectable()
export class TeacherService {
    constructor(
        @InjectModel(Teacher) private readonly teacherModel: typeof Teacher,
    ) {}

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

    async changePassword(changePasswordDto: ChangePasswordDto, teacherId: number, account) {
        const alreadyExists = await this.teacherModel.findByPk(teacherId);
        if(!alreadyExists) throw new BadRequestException('Không tìm thấy giáo viên');
        if(changePasswordDto.password !== changePasswordDto.confirmPassword) {
            throw new BadRequestException('Mật khẩu xác nhận không khớp');
        }
        Helper.checkPermission(teacherId, account)
        const updated = await this.teacherModel.update(
            { password: changePasswordDto.password },
            { where: { id: teacherId } }
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
}
