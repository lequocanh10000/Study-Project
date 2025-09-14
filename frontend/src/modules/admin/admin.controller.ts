import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterAdminDto } from './dto/register-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async register(@Body() registerAdminDto: RegisterAdminDto) {
    return await this.adminService.registerAdmin(registerAdminDto);
  }
}
