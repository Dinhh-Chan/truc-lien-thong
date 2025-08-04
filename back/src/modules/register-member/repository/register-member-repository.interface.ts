import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { RegisterMember } from "../entities/register-member-mongo.entity";

export interface RegisterMemberRepository extends BaseRepository<RegisterMember>{
    findByCode(unitCode: string): Promise<RegisterMember | null>;
}