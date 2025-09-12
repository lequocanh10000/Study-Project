import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(JwtGuard)
  @Post('create')
  async createDocument(@Body() createDocumentDto: CreateDocumentDto) {
    return await this.documentService.createDocument(createDocumentDto);
  }

  @UseGuards(new RoleGuard(['admin', 'teacher']))
  @UseGuards(JwtGuard)
  @Get('all')
  async findAll() {
    return await this.documentService.findAll();
  }

  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return this.documentService.delete(id);
  }
}
