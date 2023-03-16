import { RoutesOptions } from '@nestjsx/crud';
import { Roles } from 'src/common/decorator';
import { UserRole } from 'src/utils/enum';

export const routes: RoutesOptions = {
  createOneBase: {
    decorators: [Roles(UserRole.ADMIN)],
  },
  createManyBase: {
    decorators: [Roles(UserRole.ADMIN)],
  },
  deleteOneBase: {
    decorators: [Roles(UserRole.ADMIN)],
    returnDeleted: true,
  },
  updateOneBase: {
    decorators: [Roles(UserRole.ADMIN)],
  },
  getOneBase: {
    decorators: [Roles(UserRole.ADMIN)],
  },
  getManyBase: {
    decorators: [Roles(UserRole.ADMIN)],
  },
  replaceOneBase: {
    decorators: [Roles(UserRole.ADMIN)],
  },
  recoverOneBase: {
    decorators: [Roles(UserRole.ADMIN)],
  },
};
