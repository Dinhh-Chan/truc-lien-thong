import { BaseService } from "@config/service/base.service";
import { FormNhapLieu } from "@module/he-thong-nhap-lieu/entities/form-nhap-lieu.entity";
import { FormNhapLieuRepository } from "@module/he-thong-nhap-lieu/repositories/form-nhap-lieu/form-nhap-lieu-repository.interface";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";

@Injectable()
export class HeThongNhapLieuSerivce extends BaseService<
    FormNhapLieu,
    FormNhapLieuRepository
>{
    constructor(
        @InjectRepository(Entity.FORM_NHAP_LIEU)
        private readonly formNhapLieuRepository: FormNhapLieuRepository,
        @InjectTransaction()
        private readonly transaction: BaseTransaction
    ){
        super(formNhapLieuRepository, {
            notFoundCode: "error-file-not-found",
            transaction: transaction
        });
    }




}