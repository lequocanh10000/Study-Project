import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from 'src/models';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin) private readonly adminModel: typeof Admin,
        private readonly jwtService: JwtService
    ) {}

    async findByEmail(email: string) {
        return await this.adminModel.findOne({ where: { email }});
    }

    async validateAdmin(email: string, password: string) {
        const admin = await this.findByEmail(email);
        if(!admin) {
            throw new BadRequestException('Không tìm thấy admin');
        }

        const isCorrectPassword = admin.comparePassword(password);
        if(!isCorrectPassword) {
            throw new BadRequestException('Sai mật khẩu');
        }
        return {
            id: admin.id,
            email: email,
            role: 'admin'
        };
    }

    async registerAdmin(registerAdminDto: RegisterAdminDto) {
        const admin = await this.findByEmail(registerAdminDto.email);
        if(admin) {
            throw new BadRequestException('Email đã tồn tại');
        }
       
        await this.adminModel.create(registerAdminDto as any);
        return {
            message: 'Đăng ký thành công'
        }
    }
}
