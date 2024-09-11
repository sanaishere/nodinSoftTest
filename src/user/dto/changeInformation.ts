import { PartialType } from "@nestjs/swagger";
import { SignUpDto } from "src/auth/dto/signUp.dto";

export class ChangeInformationDto extends PartialType(SignUpDto) {}