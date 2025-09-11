import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { CurrentInfo } from 'src/common/decorators';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('register')
  async register(@Body() createTeacherDto: CreateTeacherDto) {
    return await this.teacherService.register(createTeacherDto);
  }

  @Patch('password/:id')
  @UseGuards(JwtGuard) 
  async changePassword(
    @Body() changePasswordDto, 
    @Param('id') teacherId: number,
    @CurrentInfo() account) {
    return await this.teacherService.changePassword(changePasswordDto, teacherId, account);
  }
}
