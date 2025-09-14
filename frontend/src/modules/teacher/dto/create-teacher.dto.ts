import { Matches, MaxDate } from "class-validator";
import { DateRequired, NumberRequired, StringRequired } from "src/common/decorators";

export class CreateTeacherDto {
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

    @StringRequired('Nơi tốt nghiệp')
    graduationPlace: string;

    @NumberRequired('Số năm kinh nghiêm', 1)
    expYear: number;
}