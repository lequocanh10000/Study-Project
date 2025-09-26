import { ArrayEnumRequired, BooleanNotRequired, DateRequired, EnumRequired, NumberRequired, StringRequired } from "src/common/decorators";
import { LearningForms } from "src/models";
import { LearningDays } from "src/models/class.model";

export class CreateClassDto {
    @NumberRequired('Số lượng học sinh tối đa', 1)
    maxNumber: number;

    @DateRequired('Ngày khai giảng')
    openingDate: Date;

    @EnumRequired(LearningForms, 'Hình thức học')
    learningForm: LearningForms;

    @ArrayEnumRequired(LearningDays, 'Các ngày học trong tuần')
    learningDays: LearningDays;

    @StringRequired('Phòng học')
    classRoom: string;

    @NumberRequired('Id khóa học', 1)
    courseId: number;

    @BooleanNotRequired()
    isOpened?: boolean;
}
