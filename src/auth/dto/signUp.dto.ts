import { IsEmail, IsNotEmpty, Length, Min, MinLength } from "@nestjs/class-validator";
import { IsString, Matches } from "class-validator";
import { phoneNumberValidator } from "src/common/decorators/phoneValidator";

export class SignUpDto{
    @IsString()
    @IsNotEmpty({message:'username should not be empty'})
    userName:string

    @Matches(/^(?=.*[a-z])(?=.*[A-Z]).+$/, {
        message: 'Password must contain both uppercase and lowercase letters',
      })
    @MinLength(8,{message:'password length should be greater than 8 '})
    @IsNotEmpty()
    @IsString()
    password:string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string

   @phoneNumberValidator()
    @Length(13)
    @IsNotEmpty()
    @IsString()
    phoneNumber:string
}