import {
  IsNumber,
  Min,
  Max,
  IsString,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0, { message: 'Price must be at least 0' })
  @Max(1000000, { message: 'Price must not be greater than 1000000' })
  price: number;

  @IsString({ message: 'Make must be a string' })
  make: string;

  @IsString({ message: 'Model must be a string' })
  model: string;

  @IsNumber()
  @Min(1930, { message: 'Year must not be less than 1930' })
  @Max(2050, { message: 'Year must not be greater than 2050' })
  year: number;

  @IsLatitude({ message: 'Latitude must be a valid latitude' })
  lat: number;

  @IsLongitude({ message: 'Longitude must be a valid longitude' })
  long: number;

  @IsNumber()
  @Min(0, { message: 'Mileage must be at least 0' })
  @Max(10000000, { message: 'Mileage must not be greater than 10000000' })
  mileage: number;
  // @IsNumber()
  // @Min(0)
  // @Max(1000000)
  // price: number;

  // @IsString()
  // make: string;

  // @IsString()
  // model: string;

  // @IsNumber()
  // @Min(1930)
  // @Max(2050)
  // year: number;

  // @IsLatitude()
  // lat: number;

  // @IsLongitude()
  // long: number;

  // @Min(0)
  // @Max(10000000)
  // @IsNumber()
  // mileage: number;
}
