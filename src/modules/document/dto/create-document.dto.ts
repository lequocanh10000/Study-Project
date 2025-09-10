import { ArrayNotRequired, EnumRequired, NumberRequired, StringRequired } from "src/common/decorators";
import { DocumentTypes } from "src/models";

export class DocumentClassDto {
    @NumberRequired('Mã lớp học', 1)
    classId: number;
}

export class CreateDocumentDto {
    @StringRequired('Đường dẫn')
    link: string;

    @EnumRequired(DocumentTypes, 'Loại tài liệu')
    type: DocumentTypes;

    @ArrayNotRequired(DocumentClassDto)
    documentClasses?: DocumentClassDto[];
}