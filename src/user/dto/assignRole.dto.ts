import { IsEnum, IsNotEmpty, IsString } from "@nestjs/class-validator";

export enum Roles{
    ADMIN='admin',
    User='user'
}

export class AssignRoleDto{
    @IsNotEmpty()
    @IsEnum(Roles,{message:'role must be user or admin'})
    role:string
}

