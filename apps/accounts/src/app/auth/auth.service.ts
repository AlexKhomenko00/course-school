import { UserRole } from '@microservices/interfaces';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entity/user.entity';
import { UserRepository } from '../user/repositories/user.repository';
import {
  INVALID_CREDENTIALS_ERROR,
  REGISTERED_USER_ERROR,
} from './auth.constant';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register({ email, displayName, password }: RegisterDto) {
    const oldUser = await this.userRepository.findUser(email);
    if (oldUser) {
      throw new BadRequestException(REGISTERED_USER_ERROR);
    }
    const newUserEntity = await new UserEntity({
      displayName,
      email,
      role: UserRole.Student,
      passwordHash: '',
    }).setPassword(password);
    const newUser = await this.userRepository.createUser(newUserEntity);
    return { email: newUser.email };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUser(email);
    if (!user) {
      throw new BadRequestException(INVALID_CREDENTIALS_ERROR);
    }
    const userEntity = new UserEntity(user);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if (!isCorrectPassword) {
      throw new BadRequestException(INVALID_CREDENTIALS_ERROR);
    }
    return { id: user._id };
  }

  async login(id: string) {
    return {
      access_token: await this.jwtService.signAsync({ id }),
    };
  }
}
