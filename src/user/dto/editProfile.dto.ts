import { OmitType, PartialType } from "@nestjs/swagger";
import { SignUpDto } from "src/auth/dto/signUp.dto";

export class EditProfileDto extends PartialType(OmitType(SignUpDto,['userName'] as const)) {

}