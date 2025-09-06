import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin, Class, Course, DocumentClass, Student, StudentClass, Teacher, TeacherClass, Document } from 'src/models';
import { admin, classes, courses, document_classes, documents, students, students_classes, teachers, teachers_classes } from './data';
import * as bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

@Injectable()
export class SeedService {
    constructor(
        @InjectModel(Admin) private readonly adminModel: typeof Admin,
        @InjectModel(Teacher) private readonly teacherModel: typeof Teacher,
        @InjectModel(Course) private readonly courseModel: typeof Course,
        @InjectModel(Student) private readonly studentModel: typeof Student,
        @InjectModel(Document) private readonly documentModel: typeof Document,
        @InjectModel(Class) private readonly classModel: typeof Class,
        @InjectModel(StudentClass) private readonly studentClassModel: typeof StudentClass,
        @InjectModel(TeacherClass) private readonly teacherClassModel: typeof TeacherClass,
        @InjectModel(DocumentClass) private readonly documentClassModel: typeof DocumentClass,
        private readonly sequelize: Sequelize
    ) {}
    private async seedAdmin(transaction: Transaction) {
        const adminWithHashedPassword = admin.map((admin) => {
            const hashedPassword = bcrypt.hashSync(admin.password, 10);
            return {
                ...admin,
                password: hashedPassword,
            }
        })
        return await this.adminModel.bulkCreate(adminWithHashedPassword as any, {transaction});
    }

    private async seedTeacher(transaction: Transaction) {
        const teacherWithHashedPassword = teachers.map((teacher) => {
            const hashedPassword = bcrypt.hashSync(teacher.password, 10);
            return {
                ...teacher,
                password: hashedPassword,
            }
        })
        return await this.teacherModel.bulkCreate(teacherWithHashedPassword as any, {transaction});
    }

    private async seedCourse(transaction: Transaction) {
        return await this.courseModel.bulkCreate(courses as any, {transaction});
    }

    private async seedStudent(transaction: Transaction) {
        return await this.studentModel.bulkCreate(students as any, {transaction});
    }

    private async seedDocument(transaction: Transaction) {
        return await this.documentModel.bulkCreate(documents as any, {transaction});
    }

    private async seedClass(transaction: Transaction) {
        return await this.classModel.bulkCreate(classes as any, {transaction});
    }

    private async seedDocumentClass(transaction: Transaction) {
        return await this.documentClassModel.bulkCreate(document_classes as any, {transaction});
    }

    private async seedTeacherClass(transaction: Transaction) {
        return await this.teacherClassModel.bulkCreate(teachers_classes as any, {transaction});
    }

    private async seedStudentClass(transaction: Transaction) {
        return await this.studentClassModel.bulkCreate(students_classes as any, {transaction});
    }

    async initSeedData() {
        const transaction = await this.sequelize.transaction();
        try {
            await this.seedAdmin(transaction);
            await this.seedTeacher(transaction);
            await this.seedCourse(transaction);
            await this.seedDocument(transaction);
            await this.seedStudent(transaction);
            await this.seedClass(transaction);
            await this.seedDocumentClass(transaction);
            await this.seedTeacherClass(transaction);
            await this.seedStudentClass(transaction);

            await transaction.commit();

            return { message: 'Truyền data thành công'}
        } catch(error) {
            console.log(error);
            await transaction.rollback();
            throw new BadRequestException('Lấy dữ liệu thất bại')
        }
    }
}
