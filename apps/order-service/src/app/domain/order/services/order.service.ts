// order.service.ts
import { Injectable } from '@nestjs/common';
import { UserMetaData } from 'vi-auths';
import { CreatePaymentBodyDto } from '../dto/order.dto';
import { Logger } from 'vi-logger';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface OrderServiceImpl {
  createOrder(user: UserMetaData, payload: CreatePaymentBodyDto);
}
@Injectable()
export class OrderService implements OrderServiceImpl {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
  ) {}
  createOrder(user: UserMetaData, payload: CreatePaymentBodyDto) {
    const items = payload.menu_items;

    let totalAmount = 0;

    items.forEach((tmp) => {
      totalAmount = totalAmount + tmp.count * tmp.price;
    });

    return this.orderRepo.save({
      user_id: user.uid,
      amount: totalAmount,
      address_id: payload.address_id,
      menu_items: payload.menu_items,
      status: 'draft',
    });
  }
}
