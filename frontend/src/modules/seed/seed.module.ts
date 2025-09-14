import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin, Class, Course, Document, DocumentClass, Student, StudentClass, Teacher, TeacherClass } from 'src/models';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [SequelizeModule.forFeature([Admin, Course, Class, Document, Student, Teacher, DocumentClass, StudentClass, TeacherClass])]
})
export class SeedModule {}
