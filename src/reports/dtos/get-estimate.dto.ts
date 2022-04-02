import { Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";


export class GetEstimateDto {

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({value}) => parseInt(value))
  @IsNumber()
  @Min(1940)
  @Max(new Date().getFullYear())
  year: number;

  @Transform(({value}) => parseFloat(value))
  @IsNumber()
  @IsLatitude()
  lat: number;

  @Transform(({value}) => parseFloat(value))
  @IsNumber()
  @IsLongitude()
  long: number;

  @Transform(({value}) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}