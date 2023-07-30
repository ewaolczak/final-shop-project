import { Type, Exclude } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  Max,
  ValidateNested,
  ArrayNotEmpty,
  Length,
  IsEmail,
  MaxLength,
} from 'class-validator';

export class CreateOrderDTO {
  @Min(1)
  @IsNotEmpty()
  @IsInt()
  totalCost: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  address: string;

  @IsNotEmpty()
  @IsString()
  @Length(7, 18)
  phone: string;

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrdersDTO)
  products: ProductOrdersDTO[];
}

export class ProductOrdersDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @Max(10)
  @Min(1)
  @IsInt()
  orderedAmount: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  details: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string;

  @Exclude()
  orderId: string;
}
