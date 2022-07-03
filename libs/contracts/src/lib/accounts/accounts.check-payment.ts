import { PurchaseState } from '@microservices/interfaces';
import { IsString } from 'class-validator';
import { PaymentStatus } from '../payment/payment.check';

export namespace AccountsCheckPayment {
  export const topic = 'accounts.check-payment.command';

  export class Request {
    @IsString()
    userId: string;

    @IsString()
    courseId: string;
  }

  export class Response {
    status: PaymentStatus;
  }
}
