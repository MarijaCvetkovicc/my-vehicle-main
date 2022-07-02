import { IsLongitude, IsLatitude } from "class-validator";

export class UpdateRideDto {

    @IsLatitude()
    endPointlat: number;

    @IsLongitude()
    endPointlng: number;

}