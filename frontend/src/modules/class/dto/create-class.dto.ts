import { BooleanNotRequired, DateRequired, EnumRequired, NumberRequired, StringRequired } from "src/common/decorators";
import { LearningForms } from "src/models";

export class CreateClassDto {
    @NumberRequired('Số lượng học sinh tối đa', 1)
    maxNumber: number;

    @DateRequired('Ngày khai giảng')
    openingDate: Date;

    @EnumRequired(LearningForms, 'Hình thức học')
    learningForm: LearningForms;

    @StringRequired('Phòng học')
    classRoom: string;

    @NumberRequired('Id khóa học', 1)
    courseId: number;

    @BooleanNotRequired()
    isOpened?: boolean;
}
