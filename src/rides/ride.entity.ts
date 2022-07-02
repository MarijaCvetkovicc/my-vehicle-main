import { User } from "src/users/user.entity";
import { Vehicle } from "src/vehicles/vehicle.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ride {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startPointlat: number;

    @Column()
    startPointlng: number;

    @Column()
    startTime: Date;

    @Column({ nullable: true })
    endPointlat: number;

    @Column({ nullable: true })
    endPointlng: number;

    @Column({ nullable: true })
    endTime: Date;

    @Column({ nullable: true })
    price: number;

    @ManyToOne(() => User, (user) => user.rides)
    user: User;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.rides)
    vehicle: Vehicle;

}