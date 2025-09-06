import { StringRequired } from "src/common/decorators";

export class LoginDto {

    @StringRequired('Email')
    email: string;

    @StringRequired('Mật khẫu')
    password: string;

    role: 'admin' | 'teacher';
}