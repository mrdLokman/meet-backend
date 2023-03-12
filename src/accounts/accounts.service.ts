import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountsRepository: Repository<Account>,
    ) {}

    create(account: CreateAccountDto){
        const userAccount = this.findOneByUserId(account.user.id);
        if(userAccount){
            throw new BadRequestException('User already has an account!');
        }
        const newAccount = this.accountsRepository.create(account);
        return this.accountsRepository.save(newAccount);
    }

    findOneById(id: string) {
        if(!id){
            return null;
        }
        return this.accountsRepository.findOneBy({ id }); 
    }

    findOneByUserId(userId: string) {
        if(!userId){
            return null;
        }
        return this.accountsRepository.findOneBy({ user: {id: userId} }); 
    }
    
    findAll() {
        return this.accountsRepository.find();
    }

    async update(id: string, updates: UpdateAccountDto) {
        const account = await this.findOneById(id);

        if(!account){
            throw new NotFoundException('Account not found');
        }

        Object.assign(account, updates);
        return this.accountsRepository.save(account);
    }

    async delete(id: string) {
        const account = await this.findOneById(id);

        if(!account){
            throw new NotFoundException('Account not found');
        }

        return this.accountsRepository.remove(account);
    }

}
