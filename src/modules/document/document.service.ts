import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Class, Document, DocumentClass } from 'src/models';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Document) private readonly documentModel: typeof Document,
        @InjectModel(DocumentClass) private readonly documentClassModel: typeof DocumentClass,
        @InjectModel(Class) private readonly classModel: typeof Class,
        private readonly sequelize: Sequelize,
    ) {}

    async createDocument(createDocumentDto: CreateDocumentDto) {
        const t = await this.sequelize.transaction();
        try {
            const alreadyExists = await this.documentModel.findOne({
                where: { link: createDocumentDto.link}
            })
            if(alreadyExists) {
                throw new BadRequestException('Tài liệu đã tồn tại');
            }
            const newDocument = await this.documentModel.create(createDocumentDto as any);

            if(createDocumentDto.documentClasses && createDocumentDto.documentClasses.length > 0 && newDocument) {
                const documentId = newDocument.id || newDocument.dataValues?.id;
                const classIds = createDocumentDto.documentClasses.map((documentClass) => documentClass.classId);
                const alreadyExists = await this.classModel.findAll({
                    where: {
                        id: classIds,
                    },
                    attributes: ['id']
                })
                if(alreadyExists.length !== createDocumentDto.documentClasses.length) {
                    throw new BadRequestException('Lớp học không tồn tại');
                }
                const documentClasses = createDocumentDto.documentClasses.map((documentClass) => ({
                    ...documentClass,
                    documentId,
                }));
                await this.documentClassModel.bulkCreate(documentClasses as any);
            }
            await t.commit();
            return {
                message: 'Tài liệu được tạo thành công'
            }
        } catch(error) {
            const message = error.message || 'Không tạo được tài liệu';
            await t.rollback();
            throw new BadRequestException(message);
        }
    }

    async findAll() {
        return await this.documentModel.findAll({
            include: [
                {
                    model: DocumentClass,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'documentId']
                    }
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        });
    }

    async delete(id: number) {
        await this.documentModel.destroy({ where: {id}, cascade: true});
        return {message: 'Xóa tài liệu thành công'}
    }
}
