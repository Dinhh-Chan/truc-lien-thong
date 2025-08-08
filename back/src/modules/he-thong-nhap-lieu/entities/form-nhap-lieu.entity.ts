import { StrObjectId } from "@common/constant";
import { BaseEntity } from "@common/interface/base-entity.interface"
import { CauHinh, CauHinhSchema } from "./cau-hinh.entity";
import {
    IsBoolean, 
    IsOptional,
    IsString, 
    ValidateNested,
} from "class-validator"; 
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Entity} from "@module/repository"
import { Type } from "class-transformer";
import { Document } from "mongoose";

@Schema({timestamps: true, collection: Entity.FORM_NHAP_LIEU})
export class FormNhapLieu implements BaseEntity {
    @StrObjectId()
    _id: string;

    @IsString()
    @IsOptional()
    @Prop()
    tenBaoCao?: string;

    @IsBoolean()
    @IsOptional()
    @Prop()
    isActive?: boolean;

    @IsString()
    @IsOptional()
    @Prop()
    maBaoCao?: string;

    @ValidateNested()
    @Type(() => CauHinh)
    @Prop(raw({type: CauHinhSchema}))
    cauHinh: CauHinh;
}

export const FormNhapLieuSchema = SchemaFactory.createForClass(FormNhapLieu);

export type FormNhapLieuDocument = FormNhapLieu & Document;
