import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Class } from "./class.model";
import { Teacher } from "./teacher.model";



@Table
export class TeacherClass extends Model<TeacherClass> {
    @ForeignKey(() => Class)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    classId: number

    @ForeignKey(() => Teacher)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    teacherId: number

    @Column({
        allowNull: false,
        type: DataType.DATE,
    })
    teachingDate: Date
}