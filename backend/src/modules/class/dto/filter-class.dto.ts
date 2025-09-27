import {  ArrayEnumNotRequired, BooleanNotRequired, DateNotRequired, NumberNotRequired, StringNotRequired } from "src/common/decorators";
import { LearningDays } from "src/models/class.model";

export class FilterClassDto {
    @StringNotRequired()
    search?: string;

    @BooleanNotRequired()
    isOpened?: boolean;

    @BooleanNotRequired()
    isAbsent?: boolean;

    @NumberNotRequired('Mã khóa học')
    courseId?: number;

    @ArrayEnumNotRequired(LearningDays, 'Ngày học trong tuần')
    learningDays?: LearningDays;

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