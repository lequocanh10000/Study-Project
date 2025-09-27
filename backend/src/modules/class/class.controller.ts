import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { FilterClassDto } from './dto/filter-class.dto';
import { CurrentInfo } from 'src/common/decorators';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Body() createClassDto: CreateClassDto) {
    return await this.classService.create(createClassDto);
  }

  @UseGuards(new RoleGuard(['admin', 'teacher']))
  @UseGuards(JwtGuard)
  @Get('one/:id')
  async findOne(@Param('id') id: number, @CurrentInfo() account) {
    console.log(account);
    return await this.classService.findOne(id, account);
  }

  @UseGuards(new RoleGuard(['admin', 'teacher']))
  @UseGuards(JwtGuard)
  @Get('all')
  async findAll(@Query() filterClassDto: FilterClassDto) {
    return this.classService.findAll(filterClassDto);
  }

  @UseGuards(new RoleGuard(['admin', 'teacher']))
  @UseGuards(JwtGuard)
  @Patch('open/:id')
  async open(@Param('id') id: number, @CurrentInfo() account) {
    return this.classService.open(id, account);
  }

  @UseGuards(new RoleGuard(['admin', 'teacher']))
  @UseGuards(JwtGuard)
  @Patch('close/:id')
  async close(@Param('id') id: number, @CurrentInfo() account) {
    return this.classService.close(id, account);
  }

  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(JwtGuard)
  @Delete('hard/:id')
  async removeHard(@Param('id') id: number) {
    return this.classService.removeHard(id);
  }

  @UseGuards(new RoleGuard(['admin', 'teacher']))
  @UseGuards(JwtGuard)
  @Get(':classId/students')
  async studentClassDetail(@Param('classId') classId: number, @CurrentInfo() account, @Query() filterClassDto: FilterClassDto) {
    console.log(account);
    return await this.classService.studentClassDetail(filterClassDto, classId, account, );
  }

  @UseGuards(new RoleGuard(['admin', 'teacher']))
  @UseGuards(JwtGuard)
  @Patch(':classId/students/call/:studentId')
  async call(@Param('classId') classId: number, @Param('studentId') studentId: number) {
    return this.classService.call(classId, studentId);
  }
}
