import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddressEntity } from '../entity/user.address.entity';
import { Logger } from 'vi-logger';
import { CreateAddressDto, userAddressByIdDto } from '../dto/user-request.dto';
import { UserMetaData } from 'vi-auths';
import { Repository } from 'typeorm';

export interface UserAddressServiceIml {
  update(param: userAddressByIdDto, user: UserMetaData, body: CreateAddressDto);
  delete(param: userAddressByIdDto, user: UserMetaData): Promise<void>;
  create(
    body: CreateAddressDto,
    apiUser: UserMetaData,
  ): Promise<UserAddressEntity>;
  fetchAllAddress(apiUser: UserMetaData): Promise<UserAddressEntity[]>;
}

@Injectable()
export class AccessControlService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(UserAddressEntity)
    private userAddressRepo: Repository<UserAddressEntity>,
  ) {}

  async validateAuthorization(param: userAddressByIdDto, user: UserMetaData) {
    const { id } = param;
    const address = await this.userAddressRepo.findOne({ where: { id } });

    if (!address) {
      throw new NotFoundException();
    }

    if (address.user_id !== user.uid) {
      throw new UnauthorizedException();
    }

    return address;
  }
}

Injectable();
export class UserAddressService implements UserAddressServiceIml {
  constructor(
    private readonly logger: Logger,
    private readonly accessControlService: AccessControlService,
    @InjectRepository(UserAddressEntity)
    private userAddressRepo: Repository<UserAddressEntity>,
  ) {}

  async update(
    param: userAddressByIdDto,
    user: UserMetaData,
    body: CreateAddressDto,
  ) {
    const address = await this.accessControlService.validateAuthorization(
      param,
      user,
    );

    return this.userAddressRepo.save({
      ...address,
      ...body,
    });
  }

  async delete(param: userAddressByIdDto, user: UserMetaData) {
    const address = await this.accessControlService.validateAuthorization(
      param,
      user,
    );

    this.userAddressRepo.delete({ id: address.id });
  }

  async create(
    body: CreateAddressDto,
    apiUser: UserMetaData,
  ): Promise<UserAddressEntity> {
    const saveEntity = {
      ...body,
      user_id: apiUser.uid,
    };

    const createdAddress = await this.userAddressRepo.save(saveEntity);

    this.logger.log(
      `address created successfully ${JSON.stringify(createdAddress)}`,
    );

    return createdAddress;
  }

  async fetchAllAddress(apiUser: UserMetaData): Promise<UserAddressEntity[]> {
    return await this.userAddressRepo.find({ where: { user_id: apiUser.uid } });
  }
}
