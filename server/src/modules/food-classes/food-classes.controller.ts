import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { FoodClassesService } from './food-classes.service';
import { FoodClassesEntity } from './food-classes.entity';
import { Public } from 'src/common/decorator';

@Crud({
  model: { type: FoodClassesEntity },
  params: {},
})
@Controller('food-classes')
@Public()
export class FoodClassesController {
  constructor(private service: FoodClassesService) {}
}
