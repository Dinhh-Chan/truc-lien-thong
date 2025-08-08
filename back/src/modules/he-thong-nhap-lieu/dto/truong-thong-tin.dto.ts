import { Entity } from "@module/repository";
import  { Prop, Schema, SchemaFactory, raw} from "@nestjs/mongoose"
import { ApiProperty} from "@nestjs/swagger"
import { Type } from "class-transformer";
import { Allow,
    IsArray,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString, 
    IsMongoId,
    IsNotEmpty,
    IsBoolean,
    IsDate,
    IsObject} from "class-validator"
import mongoose from "mongoose";
import { KieuDuLieu, TextDisplay } from "../common/form-dong.enum";
@Schema({
    _id: false,
})
export class TruongThongTin {
    @IsNumber()
    @IsOptional()
    @Prop()
    @ApiProperty({
        example: "n",
        description: "Số thứ tự của trường thông tin"
    })
    colspan?: number; 

    @IsEnum(TextDisplay)
    @IsOptional()
    @ApiProperty({
        example:TextDisplay.TEXAREA,
        description:"define the display of the field text"
    })
    texDisplay?: TextDisplay;

    @IsString()
    @Prop()
    @ApiProperty({
        example: "full name",
        description:"name of the field"
    })
    ten: string; 

    @IsString()
    @Prop({ required: true})
    @ApiProperty({
        example: "B23DCCC038",
        description: "code of the field"
    })
    ma: string; 

    @IsString()
    @Prop()
    @IsOptional()
    @ApiProperty({
        example: "Take a note",
        description: "note of the field"
    })
    ghiChu?: string; 

    @IsBoolean()
    @Prop( {default : false})
    @IsOptional()
    @ApiProperty({
        example: true, 
        description: "define the field is array or not"
    })
    laDangMang? : boolean;

    @IsEnum(KieuDuLieu)
    @Prop({required: true,
        type: String,
        enum: Object.values(KieuDuLieu)
    })
    @ApiProperty({
        example: KieuDuLieu.INTERGER,
        description: "define the type of the field"
    })
    kieuDuLieu: KieuDuLieu;

    @IsBoolean()
    @Prop({default: false,
        type: Boolean
    })
    @IsOptional()
    @ApiProperty({
        example: true,
        description: "define the field is required to fill in or not"
    })
    readonly? : boolean; 

    @IsBoolean()
    @Prop()
    @IsOptional()
    truongDinhDanh?: boolean;

    @IsNumber()
    @Prop()
    @IsOptional()
    min?: number;

    @IsNumber()
    @Prop()
    @IsOptional()
    max?: number;

    @IsBoolean()
    @Prop({ default: true})
    @IsOptional()
    @ApiProperty({
        example: true,
        description: "define the field is visible or not"
    })
    kichHoat?: boolean;
}
export const TruongThongTinSchema = SchemaFactory.createForClass(TruongThongTin);