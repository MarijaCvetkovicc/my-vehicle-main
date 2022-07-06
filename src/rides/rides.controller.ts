import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CurrentUserInterceptor } from 'src/users/interceptors/current-user.interceptor';
import { User } from 'src/users/user.entity';
import { CreateRideDto } from './dtos/create-ride.dto';
import { RideDto } from './dtos/ride.dto';
import { UpdateRideDto } from './dtos/update-ride.dto';
import { RidesService } from './rides.service';

@Controller('rides')
@UseInterceptors(CurrentUserInterceptor)
export class RidesController {
  constructor(private rideService: RidesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(RideDto)
  async createRide(@Body() body: CreateRideDto, @CurrentUser() user: User) {
    const response = await this.rideService.create(body, user);
    return response;
  }

  @Get()
  @Serialize(RideDto)
  findAllRides() {
    return this.rideService.find();
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @Serialize(RideDto)
  async endRide(
    @Param('id') id: string,
    @Body() body: UpdateRideDto,
    @CurrentUser() user: User,
  ) {
    const response = await this.rideService.endRide(parseInt(id), body, user);
    return response;
  }
}
