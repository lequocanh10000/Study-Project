import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { StudentClass } from "./student-class.model";

@Table
export class Student extends Model<Student> {
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    fullName: string;

    @Column({
        allowNull: false,
        type: DataType.DATE,
    })
    dob: Date;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    address: string;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    email: string;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    phone: string;

    // Relationship
    @HasMany(() => StudentClass)
    studentClasses: StudentClass[]
}