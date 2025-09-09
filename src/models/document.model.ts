import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { DocumentClass } from "./document-class.model";

export enum DocumentTypes {
    TEACHER = 'Teacher',
    STUDENT = 'Student',
    TEST = 'Test'
}

@Table
export class Document extends Model<Document> {
    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true,
    })
    link: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM(...Object.values(DocumentTypes)),
    })
    type: DocumentTypes;

    // Relationship
    @HasMany(() => DocumentClass)
    documentClasses: DocumentClass[]
}