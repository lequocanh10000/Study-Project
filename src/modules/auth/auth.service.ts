import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { TeacherService } from '../teacher/teacher.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService,
        private readonly teacherService: TeacherService,
        private readonly jwtService: JwtService
    ) {}

    async validate(req: Request, email: string, password: string) {
    if(!req.body) {
        throw new UnauthorizedException('Email hoặc mật khẩu không được để trống');
    } else {
        const role = (req.body as any).role;
        if(role === 'admin') {
            return this.adminService.validateAdmin(email, password);
        } else if(role === 'teacher') {
            return this.teacherService.validateTeacher(email, password);
        } else {
            throw new UnauthorizedException('Tài khoản không hợp lệ');
        }
    }
  }

    async login({id, email, role}) {
        const accessToken = await this.jwtService.signAsync({id, email, role});
        return { message: 'Đăng nhập thành công', accessToken, role};
    }
}
