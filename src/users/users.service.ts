import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserSource } from './enums';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    create(user: CreateUserDto){
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    findOneById(id: string) {
        if(!id){
            return null;
        }
        return this.usersRepository.findOneBy({ id }); 
    }

    findByEmail(email: string) {
        if(!email){
            return null;
        }
        return this.usersRepository.findOneBy({ email });
    }

    findOneByFacebookId(uid: string) {
        if(!uid){
            return null;
        }
        return this.usersRepository.findOneBy({ sourceUID: uid, source: UserSource.FACEBOOK });
    }

    findOneByGoogleId(uid: string) {
        if(!uid){
            return null;
        }
        return this.usersRepository.findOneBy({ sourceUID: uid, source: UserSource.GOOGLE });
    }


    findAll() {
        return this.usersRepository.find();
    }

    async update(id: string, updates: UpdateUserDto) {
        const user = await this.findOneById(id);

        if(!user){
            throw new NotFoundException('User not found');
        }

        Object.assign(user, updates);
        return this.usersRepository.save(user);
    }

    async delete(id: string) {
        const user = await this.findOneById(id);

        if(!user){
            throw new NotFoundException('User not found');
        }

        return this.usersRepository.remove(user);
    }
}
