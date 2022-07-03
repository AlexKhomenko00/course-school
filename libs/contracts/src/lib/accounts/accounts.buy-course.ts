import { IsString } from 'class-validator';

export namespace AccountsBuyCourse {
  export const topic = 'accounts.buy-course.command';

  export class Request {
    @IsString()
    userId: string;

    @IsString()
    courseId: string;
  }

  export class Response {
    paymentLink: string;
  }
}
