import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { HydratedDocument } from "mongoose";
import { IsEnum } from "class-validator";
import { RegisterMemberStatus } from "@module/register-member/common/constant";

@Schema({ 
    collection: Entity.REGISTER_MEMBER,
    timestamps: true 
})
export class RegisterMember implements BaseEntity {
    @StrObjectId()
    _id: string;

    @Prop({ 
        required: true,
        comment: "Name of the member"
    })
    unitName: string;

    @Prop({ 
        unique: true,
        sparse: true,
        comment: "Code of the member"
    })
    unitCode: string;

    @Prop({
        comment: "Email of the member" 
    })
    email: string;

    @Prop({
        comment: "attachment of the member"
    })
    attachment: string;

    @Prop({ 
        enum: RegisterMemberStatus,
        default: RegisterMemberStatus.PENDING,
        comment: "Status of the member registration"
    })
    status: RegisterMemberStatus;
}

export const RegisterMemberSchema = SchemaFactory.createForClass(RegisterMember);
export type RegisterDocument = RegisterMember & Document;