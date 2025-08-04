import { Configuration } from "@config/configuration";
import { ApiError } from "@config/exception/api-error";
import { BaseService } from "@config/service/base.service";
import { Entity } from "@module/repository";
import { BaseTransaction } from "@module/repository/common/base-transaction.interface";
import { InjectRepository } from "@module/repository/common/repository";
import { InjectTransaction } from "@module/repository/common/transaction";
import  { RegisterMember } from "../entities/register-member-mongo.entity";
import { RegisterMemberRepository } from "../repository/register-member-repository.interface";
import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { SettingService } from "@module/setting/setting.service";
import { CreateMemberRegisterDto } from "../dto/create-member-register.dto";
import { Transaction } from "sequelize";
import { RegisterMemberStatus } from "../common/constant";
import { register } from "module";
@Injectable()
export class RegisterMemberService 
    extends BaseService<RegisterMember, RegisterMemberRepository>
    {
    constructor(
        @InjectRepository(Entity.REGISTER_MEMBER)
        private readonly registerMemberRepository: RegisterMemberRepository, 
        @InjectTransaction()
        private readonly registerMemberTransaction: BaseTransaction
    ){
        super(registerMemberRepository, {
            notFoundCode: "error-register-member-not-found",
            transaction: registerMemberTransaction,
        });
    }
    async registerMember(
        dto: CreateMemberRegisterDto,
    ): Promise<RegisterMember> {
        const existingMember = await this.registerMemberRepository.findByCode(dto.unitCode);
        if (existingMember){
            throw ApiError.BadRequest("error-register-member-exist")
        }
        const t = await this.registerMemberTransaction.startTransaction();
        try {
            const newMember = await this.registerMemberRepository.create(
                {
                    ...dto,
                    status: RegisterMemberStatus.PENDING,
                },
                {transaction: t},
            )
            await this.registerMemberTransaction.commitTransaction(t);
            return newMember;
        } catch (err){
            await this.registerMemberTransaction.abortTransaction(t);
            throw err; 
        }
    }
    
}
