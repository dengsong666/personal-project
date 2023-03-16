import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { FoodClassesService } from './food-classes.service';
import { FoodClassesEntity } from './food-classes.entity';

@Crud({
  model: { type: FoodClassesEntity },
  params: {},
})
@Controller('food-classes')
export class FoodClassesController {
  constructor(private service: FoodClassesService) {}
}
