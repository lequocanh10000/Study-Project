import { BooleanNotRequired, DateNotRequired, NumberNotRequired, StringNotRequired } from "src/common/decorators";

export class FilterStudentDto {
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
}