import { IUser } from '@microservices/interfaces';
import { IsMongoId, IsString } from 'class-validator';

export namespace AccountsChangeProfile {
  export const topic = 'accounts.change-profile.command';

  export class Request {
    @IsMongoId()
    id: string;

    @IsString()
    user: Pick<IUser, 'displayName'>;
  }

  export class Response {}
}
