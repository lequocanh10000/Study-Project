import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Class } from "./class.model";
import { Student } from "./student.model";



@Table
export class StudentClass extends Model<StudentClass> {
    @ForeignKey(() => Class)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    classId: number;

    @ForeignKey(() => Student)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    studentId: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isAbsent: Boolean;

    @Column({
        type: DataType.FLOAT,
        defaultValue: 0,
    })
    finalMark: number;
}