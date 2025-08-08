import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsString, IsBoolean, IsOptional, IsNumber, ValidateNested } from "class-validator";
import { KieuDuLieu, TextDisplay } from "../common/form-dong.enum";

export class AddFieldDto {
    @ApiProperty({
        description: "Tên field",
        example: "Họ và tên"
    })
    @IsString()
    ten: string;

    @ApiProperty({
        description: "Mã field", 
        example: "ho_va_ten"
    })
    @IsString()
    ma: string;

    @ApiProperty({
        description: "Kiểu dữ liệu",
        enum: KieuDuLieu
    })
    @IsEnum(KieuDuLieu)
    kieuDuLieu: KieuDuLieu;

    @ApiProperty({
        description: "Hiển thị dạng text",
        enum: TextDisplay,
        required: false
    })
    @IsEnum(TextDisplay)
    @IsOptional()
    texDisplay?: TextDisplay;

    @ApiProperty({
        description: "Ghi chú",
        required: false
    })
    @IsString()
    @IsOptional()
    ghiChu?: string;

    @ApiProperty({
        description: "Bắt buộc",
        default: false
    })
    @IsBoolean()
    @IsOptional()
    readonly?: boolean;

    @ApiProperty({
        description: "Kích hoạt", 
        default: true
    })
    @IsBoolean()
    @IsOptional()
    kichHoat?: boolean;

    @ApiProperty({
        description: "Colspan",
        required: false
    })
    @IsNumber()
    @IsOptional()
    colspan?: number;
}

export class UpdateFieldDto {
    @ApiProperty({
        description: "Tên field",
        required: false
    })
    @IsString()
    @IsOptional()
    ten?: string;

    @ApiProperty({
        description: "Ghi chú",
        required: false
    })
    @IsString()
    @IsOptional()
    ghiChu?: string;

    @ApiProperty({
        description: "Bắt buộc",
        required: false
    })
    @IsBoolean()
    @IsOptional()
    readonly?: boolean;

    @ApiProperty({
        description: "Kích hoạt",
        required: false
    })
    @IsBoolean()
    @IsOptional()
    kichHoat?: boolean;

    @ApiProperty({
        description: "Colspan",
        required: false
    })
    @IsNumber()
    @IsOptional()
    colspan?: number;
}

export class ReorderFieldsDto {
    @ApiProperty({
        description: "Danh sách mã field theo thứ tự mới",
        type: [String],
        example: ["field1", "field2", "field3"]
    })
    @IsString({ each: true })
    fieldOrder: string[];
} 