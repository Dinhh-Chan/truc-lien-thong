import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { 
    IsBoolean, 
    IsOptional, 
    IsString, 
    ValidateNested 
} from "class-validator";
import { CauHinh } from "../entities/cau-hinh.entity";

export class CreateFormNhapLieuDto {
    @ApiProperty({
        description: "Tên báo cáo",
        example: "Form nhập liệu sinh viên"
    })
    @IsString()
    @IsOptional()
    tenBaoCao?: string;

    @ApiProperty({
        description: "Mã báo cáo",
        example: "FORM_SV_001"
    })
    @IsString()
    @IsOptional()
    maBaoCao?: string;

    @ApiProperty({
        description: "Trạng thái kích hoạt",
        example: true,
        default: true
    })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({
        description: "Cấu hình form",
        type: () => CauHinh
    })
    @ValidateNested()
    @Type(() => CauHinh)
    cauHinh: CauHinh;
} 