import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIntrestDto, UpdateIntrestDto } from './dtos';
import { Intrest } from './intrest.entity';

@Injectable()
export class IntrestsService {
    constructor(
        @InjectRepository(Intrest)
        private readonly instrestPepository: Repository<Intrest>,
    ) {}

    async create(intrest: CreateIntrestDto){
        const existingIntrest = await this.instrestPepository.findOneBy({title: intrest.title});
        if(existingIntrest){
            throw new BadRequestException('Intrest already exists!');
        }
        const newIntrest = this.instrestPepository.create(intrest);
        return this.instrestPepository.save(newIntrest);
    }

    findAll() {
        return this.instrestPepository.find();
    }

    findOneById(id: string) {
        return this.instrestPepository.findOneBy({id});
    }

    async update(id: string, updates: UpdateIntrestDto) {
        const instrest = await this.instrestPepository.findOneBy({id});

        if(!instrest){
            throw new NotFoundException('Intrest not found');
        }

        Object.assign(instrest, updates);
        return this.instrestPepository.save(instrest);
    }

    async delete(id: string) {
        const instrest = await this.instrestPepository.findOneBy({id});

        if(!instrest){
            throw new NotFoundException('Intrest not found');
        }

        return this.instrestPepository.remove(instrest);
    }
}
