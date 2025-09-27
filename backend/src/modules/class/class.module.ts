import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Class, Course, StudentClass, TeacherClass } from 'src/models';
import { CourseModule } from '../course/course.module';

@Module({
  controllers: [ClassController],
  providers: [ClassService],
  imports: [SequelizeModule.forFeature([Class, Course, TeacherClass, StudentClass]), CourseModule]
})
export class ClassModule {}
