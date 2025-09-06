import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Class } from "./class.model";
import { Document } from "./document.model";



@Table
export class DocumentClass extends Model<DocumentClass> {
    @ForeignKey(() => Class)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    classId: number

    @ForeignKey(() => Document)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    documentId: number
}