import { NumberNotRequired, StringNotRequired } from "src/common/decorators";

export class FilterTeacherDto {
    @StringNotRequired()
    search?: string;

    @NumberNotRequired('Lớp học')
    classId?: number;

    @NumberNotRequired('Trang')
    page?: number;

    @NumberNotRequired('Giới hạn')
    limit?: number;

    @StringNotRequired()
    sortBy?: string;

    @StringNotRequired()
    sortOrder?: string;

    @NumberNotRequired('Năm kinh nghiệm')
    minExpYear?: number

    @NumberNotRequired('Năm kinh nghiệm')
    maxExpYear?: number
}