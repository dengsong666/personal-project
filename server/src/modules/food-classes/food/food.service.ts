import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodEntity } from './food.entity';

@Injectable()
export class FoodService extends TypeOrmCrudService<FoodEntity>{

    constructor(@InjectRepository(FoodEntity) repo) {
        super(repo);
    }

}
