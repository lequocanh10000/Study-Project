import { StringRequired } from "src/common/decorators";

export class ChangePasswordDto {
    @StringRequired('Mật khẩu mới')
    password: string;

    @StringRequired('Phần xác nhận mật khẩu')
    confirmPassword: string
}