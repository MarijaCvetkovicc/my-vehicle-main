import { Exclude } from "class-transformer";
import { Ride } from "src/rides/ride.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;


    @OneToMany(() => Ride, (ride) => ride.user)
    rides: Ride[];
}