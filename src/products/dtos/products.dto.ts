/*
  DTO => Data transfers Objects
*/
import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive, IsArray, ArrayNotEmpty, IsOptional, Min, ValidateIf } from 'class-validator';
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty()
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto){}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;

  @IsOptional()
  @IsPositive()
  minPrice: number;

  //Valida que cuando canden maxPrice, debe existir minPrice
  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}
