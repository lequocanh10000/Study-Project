import { StringRequired } from "src/common/decorators";

export class RegisterAdminDto {
    @StringRequired('Email')
    email: string;
    
    @StringRequired('Mật khẫu')
    password: string;
}