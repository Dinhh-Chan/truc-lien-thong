import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { Injectable } from "@nestjs/common";
import { ModelCtor } from "sequelize-typescript";
import { RegisterMember } from "../entities/register-member-mongo.entity";
import { RegisterMemberRepository } from "./register-member-repository.interface";
import { InjectModel } from "@nestjs/sequelize";
@Injectable()
export class RegisterMemberMongoRepositoryIml 
    extends SqlRepository<RegisterMember>
    implements RegisterMemberRepository {
        constructor(
            @InjectModel(RegisterMember)
            private readonly registerMemberModel: ModelCtor<RegisterMember>,
        ){
            super(registerMemberModel);
        }
        async findByCode(unitCode: string): Promise<RegisterMember | null> {
            return this.registerMemberModel.findOne({
                where: { unitCode },
            });
        }
    }