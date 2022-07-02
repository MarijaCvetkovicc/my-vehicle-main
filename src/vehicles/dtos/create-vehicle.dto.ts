import { IsEmail, IsLatitude, IsLongitude, IsString } from "class-validator";

export class CreateVehicleDto {

    @IsString()
    type: string;

    @IsString()
    model: string;

    @IsString()
    year: string;

    @IsLongitude()
    longitude: number;

    @IsLatitude()
    latitude: number;

    @IsString()
    code: string;
}