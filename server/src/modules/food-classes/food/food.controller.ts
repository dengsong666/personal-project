import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { FoodService } from './food.service';
import { FoodEntity } from './food.entity';

@Crud({
  model: { type: FoodEntity },
  params: {
    classesId: {
      field: 'classesId',
      type: 'number',
    },
  },
})
@Controller('/food-classes/:classesId/foods')
export class FoodController {
  constructor(private service: FoodService) {}
}
