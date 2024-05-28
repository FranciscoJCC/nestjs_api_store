import { IsNotEmpty, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;
}

export class UpdateCategoryDto  extends PartialType(CreateCategoryDto){}

export class FilterCategoryDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}
