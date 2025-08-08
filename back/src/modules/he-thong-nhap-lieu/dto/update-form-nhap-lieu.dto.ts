import { PartialType } from "@nestjs/swagger";
import { CreateFormNhapLieuDto } from "./create-form-nhap-lieu.dto";

export class UpdateFormNhapLieuDto extends PartialType(CreateFormNhapLieuDto) {} 