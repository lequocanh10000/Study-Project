import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Class, Document, DocumentClass } from 'src/models';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService],
  imports: [SequelizeModule.forFeature([Document, DocumentClass, Class])]
})
export class DocumentModule {}
