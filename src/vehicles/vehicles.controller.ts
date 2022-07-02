import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {

    constructor(private vehiclesService: VehiclesService) { }


    @Get()
    findAllVehicles() {
        return this.vehiclesService.findAll();
    }

    @Post()
    async createVehicle(@Body() body: CreateVehicleDto) {
        const vehicle = await this.vehiclesService.create(body.type, body.model, body.year, body.latitude, body.longitude, body.code)

        return vehicle;
    }

    @Get('/:id')
    async findVehicle(@Param('id') id: string) {
        const vehicle = await this.vehiclesService.findOne(parseInt(id));
        if (!vehicle) {
            throw new NotFoundException('vehicle not found');
        }
        return vehicle;
    }

    @Get('/type/:type')
    async findVehicleByType(@Param('type') type: string) {
        const vehicle = await this.vehiclesService.find(type);
        if (!vehicle) {
            throw new NotFoundException('vehicles not found');
        }
        return vehicle;
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.vehiclesService.remove(parseInt(id))
    }


}
