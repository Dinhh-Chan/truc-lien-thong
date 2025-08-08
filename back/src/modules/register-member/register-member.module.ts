import { Module } from "@nestjs/common"
import { RegisterMemberController } from "./controller/register-member.controller"
import { RegisterMemberService } from "./services/register-member.services"
import { RegisterMemberMongoRepository } from "./repository/register-member-mongo.repository"
import { RegisterMember } from "./entities/register-member-mongo.entity"
import { Entity } from "@module/repository"
import { RepositoryProvider } from "@module/repository/common/repository"
import { TransactionProvider } from "@module/repository/common/transaction"
import { MongoTransaction } from "@module/repository/mongo/mongo.transaction"

@Module({
    controllers: [RegisterMemberController],
    providers: [
        RegisterMemberService,
        RepositoryProvider(Entity.REGISTER_MEMBER, RegisterMemberMongoRepository),
        TransactionProvider(MongoTransaction),
    ],
})
export class RegisterMemberModule {}