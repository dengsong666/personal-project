import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodClassesController } from './food-classes.controller';
import { FoodClassesEntity } from './food-classes.entity';
import { FoodClassesService } from './food-classes.service';
import { FoodModule } from './food/food.module';

@Module({
  imports: [FoodModule, TypeOrmModule.forFeature([FoodClassesEntity])],
  providers: [FoodClassesService],
  controllers: [FoodClassesController],
})
export class FoodClassesModule {}
