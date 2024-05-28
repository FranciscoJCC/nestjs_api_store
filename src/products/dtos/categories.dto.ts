import { IsNotEmpty, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateCategoryDto  extends PartialType(CreateCategoryDto){}

export class FilterCategoryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
