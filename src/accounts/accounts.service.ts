import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Equal, Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountsRepository: Repository<Account>,
    ) {}

    async create(account: CreateAccountDto, user: User){
        const userAccount = await this.findOneByUserId(user.id);
        if(userAccount){
            throw new BadRequestException('User already has an account!');
        }
        const newAccount = this.accountsRepository.create(account);
        newAccount.user = user;
        return this.accountsRepository.save(newAccount);
    }

    findOneById(id: string) {
        if(!id){
            return null;
        }
        return this.accountsRepository.findOneBy({ id }); 
    }

    async findOneByUserId(userId: string) {
        if(!userId){
            return null;
        }
        return this.accountsRepository.findOne({
            where: { user: Equal(userId) },
            relations: ['user']
          });
    }
    
    findAll() {
        return this.accountsRepository.find({
            relations: ['user']
        });
    }

    async update(userId: string, updates: UpdateAccountDto) {
        const account = await this.findOneByUserId(userId);

        if(!account){
            throw new NotFoundException('Account not found');
        }

        Object.assign(account, updates);
        return this.accountsRepository.save(account);
    }

    async delete(userId: string) {
        const account = await this.findOneByUserId(userId);

        if(!account){
            throw new NotFoundException('Account not found');
        }

        return this.accountsRepository.remove(account);
    }

}
