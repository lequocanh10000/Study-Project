import { NumberNotRequired, StringNotRequired } from "src/common/decorators";

export class FilterCourseDto {
    @StringNotRequired()
    search?: string;

    @NumberNotRequired('Trang')
    page?: number;

    @NumberNotRequired('Giới hạn')
    limit?: number;

    @StringNotRequired()
    sortBy?: string;

    @StringNotRequired()
    sortOrder?: string;

    @NumberNotRequired('Thời lượng tối thiểu')
    minSessions?: number

    @NumberNotRequired('Thời lượng tối đa')
    maxSessions?: number
}