import { Module } from "@nestjs/common";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { TransactionProvider } from "@module/repository/common/transaction";
import { MongoTransaction } from "@module/repository/mongo/mongo.transaction";

// Controllers
import { HeThongNhapLieuController } from "./he-thong-nhap-lieu.controller";

// Services  
import { HeThongNhapLieuSerivce } from "./he-thong-nhap-lieu.services";

// Repositories
import { FormNhapLieuMongoRepository } from "./repositories/form-nhap-lieu/form-nhap-lieu-mongo.repository";

@Module({
    controllers: [HeThongNhapLieuController],
    providers: [
        // Services
        HeThongNhapLieuSerivce,
        
        // Repositories
        RepositoryProvider(Entity.FORM_NHAP_LIEU, FormNhapLieuMongoRepository),
        
        // Transaction
        TransactionProvider(MongoTransaction),
    ],
    exports: [
        HeThongNhapLieuSerivce,
    ],
})
export class HeThongNhapLieuModule {}
