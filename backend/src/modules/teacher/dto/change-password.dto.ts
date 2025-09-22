import { StringRequired } from "src/common/decorators";

export class ChangePasswordDto {
    @StringRequired('Email')
    email: string;

    @StringRequired('Mật khẩu mới')
    password: string;

    @StringRequired('Phần xác nhận mật khẩu')
    confirmPassword: string
}