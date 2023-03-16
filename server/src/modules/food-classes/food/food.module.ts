import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodController } from './food.controller';
import { FoodEntity } from './food.entity';
import { FoodService } from './food.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity])],
  providers: [FoodService],
  controllers: [FoodController]
})
export class FoodModule { }
