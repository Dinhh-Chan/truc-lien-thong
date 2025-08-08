import  { GetPageQuery } from "@common/constant"
import { ApiCondition, ApiGet, ApiPageResponse } from "@common/decorator/api.decorator"
import  {CreateMemberRegisterDto} from "../dto/create-member-register.dto"
import { RegisterMemberService } from "../services/register-member.services"
import { Controller, Post, Body, Get, Query, UseGuards } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "@common/guard/jwt-auth.guard"
import { BaseControllerFactory } from "@config/controller/base-controller-factory"
import { RegisterMember } from "../entities/register-member-mongo.entity"
import { PartialType } from "@nestjs/swagger"

@Controller("register-member")
@ApiTags("Register Member")
export class RegisterMemberController extends BaseControllerFactory<RegisterMember>(
    RegisterMember, 
    PartialType(RegisterMember), // conditionDto
    CreateMemberRegisterDto, // createDto
    PartialType(RegisterMember), // updateDto
){
    constructor(private readonly registerMemberService: RegisterMemberService){
        super(registerMemberService)
    }
    @Post("/dang-ky")
    async registerMember(@Body() dto: CreateMemberRegisterDto){
        return this.registerMemberService.registerMember(dto)
    }

}