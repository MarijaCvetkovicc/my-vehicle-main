import { Expose, Transform } from "class-transformer";


export class RideDto {

    @Expose()
    id: number;

    @Expose()
    startPointlat: number;

    @Expose()
    startPointlng: number;

    @Expose()
    startTime: Date;

    @Expose()
    endPointlat: number;

    @Expose()
    endPointlng: number;

    @Expose()
    endTime: Date;

    @Expose()
    price: number;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number;

    @Transform(({ obj }) => obj.vehicle.id)
    @Expose()
    vehicleId: number;
}