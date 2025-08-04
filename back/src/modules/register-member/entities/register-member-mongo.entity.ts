import { StrObjectId } from "@common/constant";
import { EntityDefinition } from "@common/constant/class/entity-definition";
import { BaseEntity } from "@common/interface/base-entity.interface";
import { Entity } from "@module/repository";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { HydratedDocument } from "mongoose";
import { IsEnum } from "class-validator";
import { RegisterMemberStatus } from "@module/register-member/common/constant";
import {Column, DataType, Model, Table} from "sequelize-typescript";
@Table({
    tableName: "register_member",
    timestamps: true,
})
export class RegisterMember extends Model<RegisterMember> implements BaseEntity {
    @StrObjectId()
    _id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        comment: "Name of the member"
    })
    unitName : string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true,
        comment: "Code of the member"
    })
    unitCode: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: "Email of the member" 
    })
    email: string; 

    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: "attachment of the member"
    })
    attachment: string;

    @Column({
        type: DataType.ENUM(...Object.values(RegisterMemberStatus)),
        allowNull: false,
        defaultValue: RegisterMemberStatus.PENDING,
        comment: "Status of the member registration"
    })
    status: RegisterMemberStatus;
}