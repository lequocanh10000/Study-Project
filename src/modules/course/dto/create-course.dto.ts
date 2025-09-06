import { NumberRequired, StringRequired } from "src/common/decorators";

export class CreateCourseDto {
    @StringRequired('Tên khóa học')
    name: string;

    @NumberRequired('Thời lượng học', 1)
    numberSessions: number;
}