import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/modules/admin/admin.service';
import { TeacherService } from 'src/modules/teacher/teacher.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminService: AdminService, private readonly teacherService: TeacherService) {
    super({
        usernameField: 'email', 
        passReqToCallback: true
    });
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
    if(!req.body) {
        throw new UnauthorizedException('Email hoặc mật khẩu không được để trống');
    } else {
        const role = (req.body as any).role;
        if(role === 'admin') {
            return this.adminService.validateAdmin(email, password);
        } else if(role === 'teacher') {
            return this.teacherService.validateTeacher(email, password);
        } else {
            throw new UnauthorizedException('Tài khoản không hợp lệ')
        }
    }
  }
}
