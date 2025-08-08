import { MongoRepository } from "@module/repository/mongo/mongo.repository";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { RegisterMember, RegisterMemberSchema } from "../entities/register-member-mongo.entity";
import { RegisterMemberRepository } from "./register-member-repository.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Entity } from "@module/repository";
@Injectable()
export class RegisterMemberMongoRepository
    extends MongoRepository<RegisterMember>
    implements RegisterMemberRepository {
        constructor(
            @InjectModel(Entity.REGISTER_MEMBER)
            private readonly registerMemberModel: Model<RegisterMember>,
        ){
            super(registerMemberModel);
        }
        async findByCode(unitCode: string): Promise<RegisterMember | null> {
            return this.registerMemberModel.findOne({ unitCode }).exec();
        }
    }