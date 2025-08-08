import { BaseControllerFactory } from "@config/controller/base-controller-factory";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, Next } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FormNhapLieu } from "@module/he-thong-nhap-lieu/entities/form-nhap-lieu.entity";
import { HeThongNhapLieuSerivce } from "./he-thong-nhap-lieu.services";
import { CreateFormNhapLieuDto } from "./dto/create-form-nhap-lieu.dto";
import { UpdateFormNhapLieuDto } from "./dto/update-form-nhap-lieu.dto";
import { DuplicateFormDto } from "./dto/duplicate-form.dto";
import { FormPreviewResponseDto } from "./dto/form-preview.dto";
import { FormNhapLieuConditionDto } from "./dto/form-condition.dto";
import { Response, NextFunction } from "express";

@Controller("he-thong-nhap-lieu")
@ApiTags("Hệ Thống Nhập Liệu")
export class HeThongNhapLieuController extends BaseControllerFactory<FormNhapLieu>(
    FormNhapLieu,
    FormNhapLieuConditionDto,  // conditionDto
    CreateFormNhapLieuDto,     // createDto
    UpdateFormNhapLieuDto,     // updateDto
) {
    constructor(
        private readonly heThongNhapLieuService: HeThongNhapLieuSerivce
    ) {
        super(heThongNhapLieuService);
    }
    
    @Get("template/:idMau")
    @ApiOperation({summary: "Lấy mẫu nhập liệu"})
    @ApiResponse({ 
        status: 200,
        description: "Lấy mẫu nhập liệu thành công"
    })
    async getTemplateForm(
        @Param("idMau") idMau: string,
        @Res() res: Response,
        @Next() next: NextFunction,
        @Query("khongXuatKemDuLieu") khongXuatKemDuLieu: string,
    ){
        await this.heThongNhapLieuService.getTemplateForNhapLieu(
            idMau,
            res,
            next,
            khongXuatKemDuLieu 
        ); 
    }
}

