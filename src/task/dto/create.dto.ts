import { IsNotEmpty, IsString } from "@nestjs/class-validator"

export class CreateTaskDto{
    @IsString()
    @IsNotEmpty({message:'name should not be empty'})
    name:string

   @IsString()
   @IsNotEmpty({message:'description should not be empty'})
   description:string
}