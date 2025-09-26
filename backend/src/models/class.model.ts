import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Course } from "./course.model";
import { DocumentClass } from "./document-class.model";
import { TeacherClass } from "./teacher-class.model";
import { StudentClass } from "./student-class.model";

export enum LearningForms {
    ONLINE = 'Online',
    OFFLINE = 'Offline'
}

export enum LearningDays {
    MONDAY = 'T2',
    TUESDAY = 'T3',
    WEDNESDAY = 'T4',
    THURSAY = 'T5',
    FRIDAY = 'T6',
    SATURDAY = 'T7'
}

@Table
export class Class extends Model<Class> {
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    maxNumber: number;

    @Column({
        allowNull: false,
        type: DataType.DATE,
    })
    openingDate: Date;

    @Column({
        allowNull: false,
        type: DataType.ENUM(...Object.keys(LearningForms))
    })
    learningForm: LearningForms;

    @Column({
        allowNull: false,
        type: DataType.JSON
    })
    learningDays: LearningDays[];

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    classRoom: string;

    @Column({
        defaultValue: true,
        type: DataType.BOOLEAN,
    })
    isOpened: boolean;

    @ForeignKey(() => Course)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    courseId: number;

    // Relationships
    @BelongsTo(() => Course)
    course: Course;

    @HasMany(() => DocumentClass)
    documentClasses: DocumentClass[]

    @HasMany(() =>TeacherClass)
    teacherClasses: TeacherClass[]

    @HasMany(() => StudentClass)
    studentClasses: DocumentClass[]
}