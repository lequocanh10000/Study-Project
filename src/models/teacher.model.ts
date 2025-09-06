import { BeforeValidate, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { TeacherClass } from "./teacher-class.model";
import * as bcrypt from 'bcryptjs';

@Table
export class Teacher extends Model<Teacher> {
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
        type: DataType.STRING,
    })
    password: string;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    phone: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    graduationPlace: string;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    expYear: number;

    // Relationship
    @HasMany(() =>TeacherClass)
    teacherClasses: TeacherClass[]

    // Methods
    comparePassword(password: string) {
        const {password: passwordInDb} = this.get({plain: true});
        return bcrypt.compareSync(password, passwordInDb);
    }

    @BeforeValidate
    static hashPassword(teacher: Teacher) {
        if(teacher.isNewRecord) {
            const password = teacher.get('password');
            const hashedPassword = bcrypt.hashSync(password, 10);
            teacher.setDataValue('password', hashedPassword); 
        }
    }
}