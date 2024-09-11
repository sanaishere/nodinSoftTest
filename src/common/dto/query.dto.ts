import { IsEnum, IsOptional, IsString } from "@nestjs/class-validator";

export enum sortBy {
CREATED_AT= 'created_at',
UPDATED_AT= 'last_updated_at'
}

export enum orderBy {
    DESC='DESC',
    ASC='ASC'
}

export class QueryDto{
    @IsOptional()
    page:number

    @IsOptional()
    limit:number

    @IsOptional()
    @IsEnum(sortBy)
    sortBy:string

    @IsOptional()
    @IsEnum(orderBy)
    orderBy:string

    @IsOptional()
    @IsString()
    text:string
}
