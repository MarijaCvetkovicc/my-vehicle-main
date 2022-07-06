import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { Repository } from 'typeorm';
import { CreateRideDto } from './dtos/create-ride.dto';
import { UpdateRideDto } from './dtos/update-ride.dto';
import { Ride } from './ride.entity';

@Injectable()
export class RidesService {
  constructor(
    @InjectRepository(Ride) private repo: Repository<Ride>,
    private vehiclesService: VehiclesService,
  ) {}

  find() {
    return this.repo.find({ relations: ['user', 'vehicle'] }); //vrati i user i vehicle?
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id }, relations: ['user', 'vehicle'] });
  }

  async create(rideDto: CreateRideDto, user: User) {
    const { startPointlat, startPointlng, vehicleId } = rideDto;
    const ride = this.repo.create({ startPointlat, startPointlng });

    const vehicleUpdated = await this.vehiclesService.update(vehicleId, {
      isAvailable: false,
    });

    if (!user || !vehicleUpdated) {
      throw new NotFoundException('vehicle or user not provided');
    }

    ride.user = user;
    ride.vehicle = vehicleUpdated;

    ride.price = 0;
    ride.startTime = new Date();
    return this.repo.save(ride);
  }

  async endRide(id: number, rideDto: UpdateRideDto, user: User) {
    const { endPointlat, endPointlng, imageUrl } = rideDto;
    const ride = await this.findOne(id);
   
    const vehicleUpdated = await this.vehiclesService.update(ride.vehicle.id, {
        isAvailable: true,
        latitude:endPointlat,
        longitude:endPointlng
      });

    if (!ride || !user ) {
      throw new NotFoundException('ride not started');
    }
    ride.endPointlat = endPointlat;
    ride.endPointlng = endPointlng;

    ride.endTime = new Date();

    ride.imageUrl = imageUrl;

    ride.price = calculatePrice(ride.startTime, ride.endTime);2
    ride.vehicle=vehicleUpdated;

    return this.repo.save(ride);
  }
}

function calculatePrice(startTime: Date, endTime: Date): number {
  const minutes = Math.ceil(
    (Math.abs(endTime.getTime() - startTime.getTime()) / (1000 * 60)) % 60,
  );
  return minutes * 100;
}
