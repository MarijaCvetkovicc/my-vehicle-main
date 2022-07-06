import { IsLongitude, IsLatitude, IsString } from "class-validator";

export class UpdateRideDto {

    @IsLatitude()
    endPointlat: number;

    @IsLongitude()
    endPointlng: number;

    @IsString()
    imageUrl:string;
}