import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { FilterClassDto } from './dto/filter-class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post('create')
  async create(@Body() createClassDto: CreateClassDto) {
    return await this.classService.create(createClassDto);
  }

  @Get('one/:id')
  async findOne(@Param('id') id: number) {
    return await this.classService.findOne(id);
  }

  @Get('all')
  async findAll(@Query() filterClassDto: FilterClassDto) {
    return this.classService.findAll(filterClassDto);
  }

  @Delete('soft/:id')
  async removeSoft(@Param('id') id: number) {
    return this.classService.removeSoft(id);
  }

  @Delete('hard/:id')
  async removeHard(@Param('id') id: number) {
    return this.classService.removeHard(id);
  }
}
