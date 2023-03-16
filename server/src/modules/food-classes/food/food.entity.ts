import { BaseEntity } from 'config/database';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FoodClassesEntity } from '../food-classes.entity';

@Entity('food')
export class FoodEntity extends BaseEntity {
  @Column() name: string;
  @Column() img: string;
  @Column() desc: string;

  @ManyToOne((type) => FoodClassesEntity, (food_classes) => food_classes.foods)
  classes: FoodClassesEntity;

  @Column() classesId: number;
}
