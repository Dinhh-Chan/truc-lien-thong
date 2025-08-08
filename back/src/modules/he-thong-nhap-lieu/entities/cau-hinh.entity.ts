import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
    IsEnum,
    IsNotEmpty,
    IsString,
    IsMongoId,
    IsBoolean,
    IsNumber,
    IsOptional,
    ValidateNested
} from "class-validator";
import {
    TruongThongTin,
    TruongThongTinSchema
} from "../dto/truong-thong-tin.dto";
import { SchemaTypes } from "mongoose";
import { Type} from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
@Schema({
    _id: false,
    
})
export class CauHinh extends TruongThongTin {
    @IsNumber()
    @IsOptional()
    @Prop()
    thuTu?: number; 

    @ValidateNested( { each: true})
    @Type(() => TruongThongTin)
    @Prop(raw({
        type: [TruongThongTinSchema],
    }))
    @IsOptional()
    danhSachCot?: TruongThongTin[];

    @IsString({ each: true})
    @IsOptional()
    @Prop()
    danhSachCotHienThi?: string[];
}

export const CauHinhSchema = SchemaFactory.createForClass(CauHinh);