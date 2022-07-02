import { IsNumber, IsString, Min, IsLongitude, IsLatitude, IsDateString, IsOptional } from "class-validator";

export class CreateRideDto {
  @IsLatitude()
  startPointlat: number;

  @IsLongitude()
  startPointlng: number;


  @IsNumber()
  vehicleId: number;

}