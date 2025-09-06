import { BeforeValidate, Column, DataType, Model, Table } from "sequelize-typescript";
import * as bcrypt from 'bcryptjs';

@Table
export class Admin extends Model<Admin> {
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

    comparePassword(password: string) {
        const {password: passwordInDb} = this.get({plain: true});
        return bcrypt.compareSync(password, passwordInDb);
    }

    getAdminWithoutPassword() {
        const {password: _, ...rest} = this.get({plain: true});
        return rest;
    }

    @BeforeValidate
    static hashPassword(admin: Admin) {
        if(admin.isNewRecord) {
            const password = admin.get('password');
            const hashedPassword = bcrypt.hashSync(password, 10);
            admin.setDataValue('password', hashedPassword); 
        }
    }
}