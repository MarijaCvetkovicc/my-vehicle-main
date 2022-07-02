import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehiclesService {

    constructor(@InjectRepository(Vehicle) private repo: Repository<Vehicle>) { }

    create(type: string, model: string, year: string, latitude: number, longitude: number, code: string) {
        const vehicle = this.repo.create({ type, model, year, latitude, longitude, code });

        return this.repo.save(vehicle);
    }

    findOne(id: number) {
        if (!id) {
            return null;
        }
        return this.repo.findOne({ where: { id } });
    }

    find(type: string) {
        return this.repo.find({ where: { type } })
    }

    findAll() {
        return this.repo.find();
    }

    async update(id: number, attrs: Partial<Vehicle>) {
        const vehicle = await this.findOne(id);
        if (!vehicle) {
            throw new NotFoundException('vehicle not found');

        }
        Object.assign(vehicle, attrs);
        return this.repo.save(vehicle);
    }

    async remove(id: number) {
        const vehicle = await this.findOne(id);
        if (!vehicle) {
            throw new NotFoundException('vehicle not found');
        }
        return this.repo.remove(vehicle);

    }


}
