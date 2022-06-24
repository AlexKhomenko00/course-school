export namespace AccountsLogin {
  export const topic = 'accounts.login.command';

  export class Request {
    email: string;
    password: string;
  }

  export class Response {
    access_token: string;
  }
}
