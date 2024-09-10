import { IsNotEmpty, IsString, Matches, MinLength } from "@nestjs/class-validator"

export class LoginDto{
    @IsNotEmpty({message:'username should not be empty'})
    @IsString()
    userName:string

    @Matches(/^(?=.*[a-z])(?=.*[A-Z]).+$/, {
        message: 'Password must contain both uppercase and lowercase letters',
    })
    @MinLength(8,{message:'password length should be greater than 8 '})
    @IsNotEmpty({message:'password should not be empty'})
    @IsString()
    password:string
}