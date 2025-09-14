import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from 'src/models';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Course) private readonly courseModel: typeof Course
    ) {}

    async createCourse(createCourseDto: CreateCourseDto) {
        const courseExists = await this.courseModel.findOne({
            where: { name: createCourseDto.name},
        })
        if(courseExists) {
            throw new BadRequestException('Khóa học đã tồn tại');
        }
        await this.courseModel.create(createCourseDto as any)
        return {
            message: 'Tạo khóa học thành công'
        }
    }

    async findAll() {
        return await this.courseModel.findAll({
            order: [['name', 'ASC']],
            attributes: { exclude: ['createdAt', 'updatedAt']}
        });
    }

    async findOne(id: number) {
        return await this.courseModel.findOne({
            where: {id: id},
            raw: true,
            attributes: { exclude: ['createdAt', 'updatedAt']}
        });
    }

    async delete(id: number) {
        await this.courseModel.destroy({ where: { id}, cascade: true });
        return {message: 'Xoá thông tin khóa học thành công'};
    }
}
