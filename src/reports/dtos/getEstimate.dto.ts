import { Transform } from 'class-transformer';
import {
  IsNumber,
  Min,
  Max,
  IsString,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class getEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  long: number;

  @Transform(({ value }) => parseInt(value))
  @Min(0)
  @Max(10000000)
  @IsNumber()
  mileage: number;
}
