import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class DuplicateFormDto {
    @ApiProperty({
        description: "Tên báo cáo mới",
        example: "Form nhập liệu sinh viên - Copy"
    })
    @IsString()
    @IsNotEmpty()
    tenBaoCao: string;
} 