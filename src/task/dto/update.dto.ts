import { PartialType } from "@nestjs/swagger";
import { CreateTaskDto } from "./create.dto";

export class UPdateTaskDto extends PartialType(CreateTaskDto){}