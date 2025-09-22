import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { CurrentInfo } from 'src/common/decorators';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { FilterTeacherDto } from './dto/filter-teacher.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('register')
  async register(@Body() createTeacherDto: CreateTeacherDto) {
    return await this.teacherService.register(createTeacherDto);
  }

  @Patch('password')
  async changePassword(@Body() changePasswordDto) {
    return await this.teacherService.changePassword(changePasswordDto);
  }

  @UseGuards(new RoleGuard(['admin', 'teacher']))
  @UseGuards(JwtGuard)
  @Get('one/:id')
  async findOne(@Param('id') id: number, @CurrentInfo() account) {
    return this.teacherService.findOne(id, account);
  }

  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(JwtGuard)
  @Get('all')
  async findAll(@Query() filterTeacherDto: FilterTeacherDto) {
    return await this.teacherService.findAll(filterTeacherDto)
  }

  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    return await this.teacherService.delete(id);
  }
}
