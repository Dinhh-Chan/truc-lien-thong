import { BaseService } from "@config/service/base.service";
import { FormNhapLieu } from "@module/he-thong-nhap-lieu/entities/form-nhap-lieu.entity";
import { FormNhapLieuRepository } from "@module/he-thong-nhap-lieu/repositories/form-nhap-lieu/form-nhap-lieu-repository.interface";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@module/repository/common/repository";
import { Entity } from "@module/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { NextFunction, Request, Response } from "express";
import { KieuDuLieu } from "./common/form-dong.enum";
import * as Excel from "exceljs";
import { Workbook } from "exceljs";
import { exportFileHelper, ExportType } from "@common/constant";
import { TruongThongTin } from "./dto/truong-thong-tin.dto";
import { CauHinh } from "./entities/cau-hinh.entity";

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

    async getTemplateForNhapLieu (
        idMau: string,
        res: Response,
        next: NextFunction, 
        khongXuatKemDuLieu: string, 
    ){
        try {
            const mau = await this.formNhapLieuRepository.getById(idMau, {});
            if (!mau){
                throw new NotFoundException("error-mau-khong-tim-thay");
            }
            let danhSachMau: FormNhapLieu[] =  [];
            if (!khongXuatKemDuLieu){
                danhSachMau = await this.formNhapLieuRepository.getMany({
                    cauHinhFormId : idMau
                })
            }
            else {
                danhSachMau = [];
            }
            const cauHinhTenArr : {
                ten: string; 
                kieuDuLieu: string;
                ma: string;
                truongDinhDanh: string; 
                batBuoc: boolean;
            }[] = []; 
            const danhSachTable: CauHinh[] = [];
            const danhSachDinhDanh: TruongThongTin[] = [];
            
            // Kiểm tra cấu hình của form
            if (mau.cauHinh) {
                // Xử lý cấu hình chính
                if (mau.cauHinh.truongDinhDanh) {
                    danhSachDinhDanh.push(mau.cauHinh);
                }
                if (mau.cauHinh.kieuDuLieu === KieuDuLieu.PARAGRAPH) {
                    // Bỏ qua paragraph
                } else if (mau.cauHinh.kieuDuLieu === KieuDuLieu.TABLE) {
                    danhSachTable.push(mau.cauHinh);
                } else {
                    cauHinhTenArr.push({
                        ten: mau.cauHinh.ten,
                        kieuDuLieu: mau.cauHinh.kieuDuLieu,
                        ma: mau.cauHinh.ma,
                        truongDinhDanh: mau.cauHinh.truongDinhDanh ? 'true' : 'false',
                        batBuoc: mau.cauHinh.readonly || false
                    });
                }

                // Xử lý danh sách cột nếu có
                if (mau.cauHinh.danhSachCot && mau.cauHinh.danhSachCot.length > 0) {
                    for (const cot of mau.cauHinh.danhSachCot) {
                        if (cot.truongDinhDanh) {
                            danhSachDinhDanh.push(cot);
                        }
                        if (cot.kieuDuLieu === KieuDuLieu.PARAGRAPH) {
                            continue;
                        }
                        if (cot.kieuDuLieu === KieuDuLieu.TABLE) {
                            // Không thể có table trong danh sách cột
                            continue;
                        }
                        cauHinhTenArr.push({
                            ten: cot.ten,
                            kieuDuLieu: cot.kieuDuLieu,
                            ma: cot.ma,
                            truongDinhDanh: cot.truongDinhDanh ? 'true' : 'false',
                            batBuoc: cot.readonly || false
                        });
                    }
                }
            }

            const workbook = new Excel.Workbook();
            await this.handleSheetData(
                workbook,
                cauHinhTenArr,
                "Danh sach thong tin",
                danhSachMau,
                false,
            );

            for (const table of danhSachTable) {
                const danhSachCot = table.danhSachCot || [];
                const cotWithBatBuocFalse = danhSachCot.map((a) => {
                    a.readonly = false;
                    return a;
                });

                await this.handleSheetData(
                    workbook,
                    [
                        ...danhSachDinhDanh,
                        ...cotWithBatBuocFalse,
                    ],
                    table.ma, 
                    danhSachMau,
                    true, 
                );
            }

            const buffer = await workbook.xlsx.writeBuffer();
            exportFileHelper(
                buffer as unknown as Buffer, 
                `import-template-${mau.tenBaoCao || 'form'}.xlsx`,
                ExportType.XLSX,
                res
            );
            next();
        }
        catch (error) {
            next(error);
        }
    }

    private async handleSheetData(
        workbook: Excel.Workbook,
        cauHinhTenArr: any[],
        sheetName: string,
        danhSachMau: FormNhapLieu[],
        isTable: boolean
    ) {
        const worksheet = workbook.addWorksheet(sheetName);
        
        // Thêm header
        const headers = cauHinhTenArr.map(item => item.ten);
        const headerRow = worksheet.addRow(headers);
        
        // Định dạng header
        headerRow.eachCell((cell) => {
            cell.font = { bold: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }
            };
        });

        // Thêm dữ liệu mẫu nếu có
        if (danhSachMau.length > 0) {
            for (const mau of danhSachMau) {
                const rowData = cauHinhTenArr.map(item => {
                    // Logic để lấy giá trị từ mau dựa trên item.ma
                    return ''; // Placeholder - cần implement logic cụ thể
                });
                worksheet.addRow(rowData);
            }
        }

        // Định dạng cột
        cauHinhTenArr.forEach((item, index) => {
            const column = worksheet.getColumn(index + 1);
            column.width = 20;
            
            // Thêm validation nếu cần
            if (item.batBuoc) {
                column.eachCell((cell, rowNumber) => {
                    if (rowNumber > 1) { // Bỏ qua header
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFFFE6E6' }
                        };
                    }
                });
            }
        });
    }
}