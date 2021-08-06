import { PartialType } from "@nestjs/mapped-types";
import { CreateChatDto } from "./create-chat.dto";


// PartialType : npm i @nestjs/mapped-types 설치
export class UpdateChatDto extends PartialType(CreateChatDto) {

}