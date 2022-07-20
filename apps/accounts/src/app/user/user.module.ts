import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { UserQueries } from './user.queries';
import { UserRepository } from './repositories/user.repository';
import { UserEventEmitter } from './user.event-emitter';
import { UserService } from './user.service';
import { UserCommands } from './user.commands';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserQueries, UserCommands],
  providers: [UserRepository, UserEventEmitter, UserService],
  exports: [UserRepository],
})
export class UserModule {}
