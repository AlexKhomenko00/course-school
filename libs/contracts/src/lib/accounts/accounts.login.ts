import { IsEmail, IsString } from 'class-validator';

export namespace AccountsLogin {
  export const topic = 'accounts.login.command';

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
  }

  export class Response {
    access_token: string;
  }
}
