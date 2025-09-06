import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from 'src/models';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService],
  imports: [SequelizeModule.forFeature([Teacher])],
  exports: [TeacherService],
})
export class TeacherModule {}
