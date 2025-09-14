import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from 'src/models';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [SequelizeModule.forFeature([Admin])],
  exports: [AdminService],
})
export class AdminModule {}
