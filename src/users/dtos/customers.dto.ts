import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto){}

export class FilterCustomerDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
