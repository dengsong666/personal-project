import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Base')
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({
    type: 'datetime',
    nullable: false,
    comment: '创建时间',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '更新时间',
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '删除时间',
  })
  deleted_at: Date;
}
