import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('create')
  async createDocument(@Body() createDocumentDto: CreateDocumentDto) {
    return await this.documentService.createDocument(createDocumentDto);
  }

  @Get('all')
  async findAll() {
    return await this.documentService.findAll();
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return this.documentService.delete(id);
  }
}
