import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { Ride } from './ride.entity';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ride]), VehiclesModule, UsersModule],
  controllers: [RidesController],
  providers: [RidesService]
})
export class RidesModule { }
