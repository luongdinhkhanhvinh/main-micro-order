import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuItemBodyDto } from '../dto/order.dto';

@Entity('orders')
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', select: true })
  public user_id!: string;

  @Column({ type: 'uuid', select: true })
  public restaurant_id!: string;

  @Column({ type: 'uuid', select: true, default: null })
  public address_id!: string;

  @Column({ type: 'varchar', default: 'draft' })
  public status!: string;

  @Column({ type: 'int', select: true })
  public amount!: number;

  @Column({ type: 'jsonb', default: null })
  public menu_items!: MenuItemBodyDto[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public updated_at!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true,
  })
  public deleted_at!: Date;
}
