import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { RidesModule } from './rides/rides.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Ride } from './rides/ride.entity';
import { Vehicle } from './vehicles/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Ride, Vehicle],
    synchronize: true
  }),
    UsersModule, VehiclesModule, RidesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
