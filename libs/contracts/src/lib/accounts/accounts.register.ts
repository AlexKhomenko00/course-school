export namespace AccountsRegister {
  export const topic = 'accounts.register.command';

  export class Request {
    email: string;
    password: string;
    displayName: string;
  }

  export class Response {
    email: string;
  }
}
