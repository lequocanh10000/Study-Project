import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { FilterCourseDto } from './dto/filter-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(JwtGuard)
  @Post('create')
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return await this.courseService.createCourse(createCourseDto)
  }
  
  @UseGuards(new RoleGuard(['admin', 'teacher']))
  @UseGuards(JwtGuard)
  @Get('all')
  async getAllCourse(@Query() filterCourseDto: FilterCourseDto) {
    return await this.courseService.findAll(filterCourseDto);
  }
  
  @Get('one/:id')
  async getCourseById(@Param('id') id: number) {
    return await this.courseService.findOne(id);
  }
    
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return this.courseService.delete(id);
  }
}
