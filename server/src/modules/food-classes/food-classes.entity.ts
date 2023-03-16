import { BaseEntity } from 'config/database';
import { Column, Entity, OneToMany } from 'typeorm';
import { FoodEntity } from './food/food.entity';

@Entity('food_classes')
export class FoodClassesEntity extends BaseEntity {
  @Column() name: string;
  @Column() img: string;

  @OneToMany((type) => FoodEntity, (food) => food.classes)
  foods: FoodEntity[];
}
