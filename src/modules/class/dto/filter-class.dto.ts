import { BooleanNotRequired, DateNotRequired, NumberNotRequired, StringNotRequired } from "src/common/decorators";

export class FilterClassDto {
    @StringNotRequired()
    search?: string;

    @BooleanNotRequired()
    isOpened?: boolean;

    @NumberNotRequired('Mã khóa học')
    courseId?: number;

    @NumberNotRequired('Trang')
    page?: number;

    @NumberNotRequired('Giới hạn')
    limit?: number;

    @StringNotRequired()
    sortBy?: string;

    @StringNotRequired()
    sortOrder?: string;

    @DateNotRequired()
    soonest?: Date;

    @DateNotRequired()
    latest?: Date;
}