import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('signUp')
    async signUp(@Body() signUpInput:SignUpDto) {
        return await this.authService.signUp(signUpInput)
    }

    @Post('login')
    async login(@Body() loginInput:LoginDto) {
       return await this.authService.login(loginInput)
    }

}
