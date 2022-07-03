import { IUser } from '@microservices/interfaces';
import { IsMongoId } from 'class-validator';

export namespace AccountsUserInfo {
  export const topic = 'accounts.user-info.query';

  export class Request {
    @IsMongoId()
    id: string;
  }

  export class Response {
    profile: Omit<IUser, 'passwordHash'>;
  }
}
