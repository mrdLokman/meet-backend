import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Intrest } from 'src/intrests/intrest.entity';
import { IntrestsService } from 'src/intrests/intrests.service';
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
        private readonly intrestsService: IntrestsService,
    ) {}

    async create(account: CreateAccountDto, user: User){
        const userAccount = await this.findOneByUserId(user.id);
        if(userAccount){
            throw new BadRequestException('User already has an account!');
        }
        
        const newAccount = this.accountsRepository.create(account);
        newAccount.user = user;

        if(account.intrestIds){
            const intrests: Intrest[]= [];
            for(const intrestId of account.intrestIds){
                const intrest = await this.intrestsService.findOneById(intrestId);
                intrests.push(intrest);
            }
            newAccount.intrests = intrests;
        }

        return this.accountsRepository.save(newAccount);
    }

    findOneById(id: string) {
        if(!id){
            return null;
        }
        return this.accountsRepository.findOneBy({ id }); 
    }

    findOneByUserName(username: string) {
        if(!username){
            return null;
        }
        return this.accountsRepository.findOneBy({ username }); 
    }


    async findOneByUserId(userId: string) {
        if(!userId){
            return null;
        }
        return this.accountsRepository.findOne({
            where: { user: Equal(userId) },
            relations: ['user', 'intrests']
        }); 
    }

    findAll() {
        return this.accountsRepository.find({
            relations: ['user', 'intrests'],
        });
    }

    async update(userId: string, updates: UpdateAccountDto) {
        const account = await this.findOneByUserId(userId);

        if(!account){
            throw new NotFoundException('Account not found');
        }
        
        if(updates.intrestIds){
            const intrests: Intrest[]= [];
            for(const intrestId of updates.intrestIds){
                const intrest = await this.intrestsService.findOneById(intrestId);
                intrests.push(intrest);
            }
            account.intrests = intrests;
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

    async addIntrestToAccount(userId: string, intrestId: string) {
        const account = await this.findOneByUserId(userId);
        if(!account){
            throw new NotFoundException('Account not found');
        }
        const intrest = await this.intrestsService.findOneById(intrestId)
        if(!intrest){
            throw new NotFoundException('Intrest not found');
        }
        const intrestIds = account.intrests.filter(i=>i.id===intrestId);
        if(intrestIds.length===0){
            account.intrests.push(intrest);
        }
        return this.accountsRepository.save(account);
    }
    
    async removeIntrestFromAccount(userId: string, intrestId: string) {
        const account = await this.findOneByUserId(userId);
        if(!account){
            throw new NotFoundException('Account not found');
        }
        account.intrests = account.intrests.filter(intrest => intrest.id !== intrestId);
        return this.accountsRepository.save(account);
    }

}
