import { IsMongoId, IsNumber, IsString } from 'class-validator';

export type PaymentStatus = 'canceled' | 'success ' | 'pending';

export namespace PaymentCheck {
  export const topic = 'payment.check.query';

  export class Request {
    @IsMongoId()
    courseId: string;

    @IsString()
    userId: string;
  }

  export class Response {
    status: PaymentStatus;
  }
}
