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
   @IsString()
   @IsNotEmpty()
    password:string

    @IsEmail({message:'email should not be empty'})
    @IsString()
    @IsNotEmpty()
    email:string

    
    @Length(13)
    @IsString()
    @IsNotEmpty({message:'enter phoneNumber'})
    @phoneNumberValidator()
    phoneNumber:string
}