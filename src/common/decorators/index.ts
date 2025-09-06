import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";


export const StringRequired = (name: string) => applyDecorators(
    ApiProperty({ required: true}),
    IsString({message: `${name} phải là chuỗi`}),
    IsNotEmpty({ message: `${name} không được bỏ trống`})
)

export const DateRequired = (name: string) => applyDecorators(
    ApiProperty({ required: true}),
    Type(() => Date),
    IsDate({message: `${name} phải có dạng YYY-MM-DD`}),
    IsNotEmpty({ message: `${name} không được bỏ trống`})
)

export const NumberRequired = (name: string, min: number = 0, max?: number) => applyDecorators(
    ApiProperty({ required: true}),
    IsNotEmpty({ message: `${name} không được bỏ trống`}),
    IsNumber({},{message: `${name} phải là số`}),
    Min(min),
    ...(max ? [Max(max)] : []),
)

export const EnumRequired = (enumType: any, name: string) => applyDecorators(
    ApiProperty({required: true}),
    IsNotEmpty({ message: `${name} không được bỏ trống`}),
    IsEnum(enumType)
)

export const ArrayNotRequired = (type: any) => applyDecorators(
    ApiProperty({required: false}),
    IsOptional(),
    IsArray(),
    ValidateNested({each: true}),
    Type(() => type)
)

export const BooleanNotRequired = () => applyDecorators(
    ApiProperty({required: false}),
    IsOptional(),
    IsBoolean()
)

export const NumberNotRequired = (name: string) => applyDecorators(
    ApiProperty({ required: false}),
    IsOptional(),
    IsNumber({}, {message: `${name} phải là số`})
)

export const StringNotRequired = () => applyDecorators(
    ApiProperty({ required: false}),
    IsOptional(),
    IsString()
)

export const DateNotRequired = () => applyDecorators(
    ApiProperty({ required: false}),
    Type(() => Date),
    IsDate(),
    IsOptional()
)