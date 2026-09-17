import { IsString , IsNotEmpty ,IsNumber } from "class-validator"
export class CreateCourseDto {
@IsString()
name : string
@IsString()
@IsNotEmpty()
description : string

@IsString()
@IsNotEmpty()
level : string
@IsNumber()
@IsNotEmpty()
price :number




}
