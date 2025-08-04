import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateMemberRegisterDto {
    @IsString()
    @IsNotEmpty()
    unitName: string;

    @IsString()
    @IsOptional()
    unitCode?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    attachment?: string;

    @IsString()
    @IsOptional()
    status?: string; 
    }
