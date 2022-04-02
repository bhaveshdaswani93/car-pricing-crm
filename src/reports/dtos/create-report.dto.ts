import { IsNumber, IsString, Max, Min } from "class-validator";


export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1940)
  @Max(new Date().getFullYear())
  year: number;

  @IsNumber()
  lat: number;

  @IsNumber()
  long: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}