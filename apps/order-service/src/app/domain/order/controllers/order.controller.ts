// order.controller.ts
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { Logger } from 'vi-logger';
import { FirebaseAuthGuard, User, UserMetaData } from 'vi-auths';
import { CreatePaymentBodyDto } from '../dto/order.dto';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_ENTITY_FOUND,
  UNAUTHORIZED_REQUEST,
} from 'src/app/app.constants';

@ApiBearerAuth('authorization')
@Controller('orders')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@ApiTags('orders')
export class OrderController {
  constructor(
    private readonly service: OrderService,
    private readonly logger: Logger,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseGuards(FirebaseAuthGuard)
  @Post('/')
  public async createOrder(
    @User() user: UserMetaData,
    @Body() payload: CreatePaymentBodyDto,
  ) {
    return await this.service.createOrder(user, payload);
  }
}
