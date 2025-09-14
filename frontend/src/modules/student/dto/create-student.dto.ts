import { Matches, MaxDate } from "class-validator";
import { ArrayNotRequired, BooleanNotRequired, DateRequired, NumberNotRequired, NumberRequired, StringRequired } from "src/common/decorators";

export class StudentClassDto {
    @NumberRequired('Mã lớp học', 1)
    classId: number;

    @BooleanNotRequired()
    isExpelled?: boolean;

    @NumberNotRequired('Điểm tổng kết')
    finalMark?: number;
}

export class CreateStudentDto {
    @StringRequired('Họ và tên')
    fullName: string;

    @DateRequired('Ngày sinh')
    @MaxDate(new Date(), { message: 'Ngày sinh không hợp lệ' })
    dob: Date;

    @StringRequired('Địa chỉ')
    address: string;

    @StringRequired('Email')
    email: string;

    @StringRequired('Số điện thoại')
    @Matches(/^0\d{9,11}$/, { message: 'Số điện thoại không hợp lệ' })
    phone: string;

    @ArrayNotRequired(StudentClassDto)
    studentClasses?: StudentClassDto[];
}

