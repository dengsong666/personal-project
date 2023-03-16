import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodClassesEntity } from './food-classes.entity';

@Injectable()
export class FoodClassesService extends TypeOrmCrudService<FoodClassesEntity>{

    constructor(@InjectRepository(FoodClassesEntity) repo) {
        super(repo);
    }

}
