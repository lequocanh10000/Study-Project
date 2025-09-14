import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from 'src/models';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [SequelizeModule.forFeature([Course])],
  exports: [CourseService]
})
export class CourseModule {}
