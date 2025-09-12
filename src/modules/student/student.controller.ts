import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { FilterStudentDto } from './dto/filter-student.dto';
import { RoleGuard } from '../auth/guards/role.guard';

@ApiTags('Học sinh')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Tạo học sinh thành công'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email hoặc mật khẩu đã tồn tại',
  })
  @ApiOperation({ summary: 'Tạo học sinh mới(Admin only)'})
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(JwtGuard)
  @Post('create')
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentService.createStudent(createStudentDto);
  }

  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(JwtGuard)
  @Get('all')
  async getAllStudents(@Query() filterstudentDto: FilterStudentDto ) {
    return await this.studentService.findAll(filterstudentDto);
  }

  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(JwtGuard)
  @Get('one/:id')
  async getStudentById(@Param('id') id: number) {
    return await this.studentService.findOne(id);
  }

  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(JwtGuard)
  @Patch('update/:id')
  async update(@Body() updateStudentDto: UpdateStudentDto, @Param('id') id: number) {
    return this.studentService.update(updateStudentDto, id);
  }

  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return this.studentService.delete(id);
  }
}
