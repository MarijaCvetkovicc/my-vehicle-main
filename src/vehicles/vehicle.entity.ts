import { Ride } from "src/rides/ride.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Vehicle {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    model: string;

    @Column()
    year: string;

    @Column()
    longitude: number;

    @Column()
    latitude: number;

    @Column()
    code: string;

    @OneToMany(() => Ride, (ride) => ride.vehicle)
    rides: Ride[];
}