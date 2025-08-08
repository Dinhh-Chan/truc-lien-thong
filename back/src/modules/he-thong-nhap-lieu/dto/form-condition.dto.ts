import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class FormNhapLieuConditionDto {
    @ApiProperty({
        description: "Tên báo cáo",
        required: false
    })
    @IsString()
    @IsOptional()
    tenBaoCao?: string;

    @ApiProperty({
        description: "Mã báo cáo", 
        required: false
    })
    @IsString()
    @IsOptional()
    maBaoCao?: string;

    @ApiProperty({
        description: "Trạng thái kích hoạt",
        required: false
    })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
} 