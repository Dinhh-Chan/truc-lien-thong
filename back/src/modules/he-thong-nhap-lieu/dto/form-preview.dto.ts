import { ApiProperty } from "@nestjs/swagger";

export class FormPreviewDto {
    @ApiProperty({ description: "HTML của form" })
    html: string;

    @ApiProperty({ description: "Danh sách fields" })
    fields: any[];

    @ApiProperty({ description: "Validation rules" })
    validation: any;
}

export class FormPreviewResponseDto {
    @ApiProperty({ description: "ID của form" })
    id: string;

    @ApiProperty({ description: "Tên báo cáo" })
    tenBaoCao?: string;

    @ApiProperty({ description: "Mã báo cáo" })
    maBaoCao?: string;

    @ApiProperty({ description: "Trạng thái kích hoạt" })
    isActive?: boolean;

    @ApiProperty({ description: "Cấu hình form" })
    cauHinh: any;

    @ApiProperty({ description: "Preview form", type: FormPreviewDto })
    preview: FormPreviewDto;
} 