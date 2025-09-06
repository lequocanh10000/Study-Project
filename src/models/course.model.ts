import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Class } from "./class.model";

@Table
export class Course extends Model<Course> {
    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true
    })
    name: string;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    numberSessions: number;

    // Relationship
    @HasMany(() => Class)
    classes: Class[]
}