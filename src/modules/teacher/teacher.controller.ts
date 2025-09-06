import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('register')
  async register(@Body() createTeacherDto: CreateTeacherDto) {
    return await this.teacherService.register(createTeacherDto);
  }

  @Patch('password/:id')
  async changePassword(@Body() changePasswordDto, @Param('id') teacherId: number) {
    return await this.teacherService.changePassword(changePasswordDto, teacherId);
  }
}
