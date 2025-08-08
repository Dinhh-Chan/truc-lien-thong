import { FormNhapLieu } from "@module/he-thong-nhap-lieu/entities/form-nhap-lieu.entity";
import { FormNhapLieuRepository } from "./form-nhap-lieu-repository.interface";
import { Entity } from "@module/repository";
import { MongoRepository } from "@module/repository/mongo/mongo.repository";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class FormNhapLieuMongoRepository 
    extends MongoRepository<FormNhapLieu>
    implements FormNhapLieuRepository 
{
    constructor(
        @InjectModel(Entity.FORM_NHAP_LIEU)
        private readonly formNhapLieuModel: Model<FormNhapLieu>
    ) {
        super(formNhapLieuModel);
    }
}