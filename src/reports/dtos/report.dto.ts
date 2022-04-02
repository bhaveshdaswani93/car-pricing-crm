import { Expose, Transform } from "class-transformer";

export class ReportDto {
  @Expose()
  price: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  lat: number;
  @Expose()
  long: number;
  @Expose()
  mileage: number;
  @Expose()
  id: number;
  @Transform(({obj}) => obj?.user?.id)
  @Expose()
  userId: number;
}