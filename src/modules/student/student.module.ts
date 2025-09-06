import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Class, Student, StudentClass } from 'src/models';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [SequelizeModule.forFeature([Student, StudentClass, Class]), AuthModule],
})
export class StudentModule {}
