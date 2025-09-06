import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Class, Course } from 'src/models';
import { CourseModule } from '../course/course.module';

@Module({
  controllers: [ClassController],
  providers: [ClassService],
  imports: [SequelizeModule.forFeature([Class, Course]), CourseModule]
})
export class ClassModule {}
