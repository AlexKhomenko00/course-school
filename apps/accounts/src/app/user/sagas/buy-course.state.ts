import { PaymentStatus } from '@microservices/contracts';
import { UserEntity } from '../entity/user.entity';
import { BuyCourseSaga } from './buy-course.saga';

export interface IPaymentResult {
  paymentLink: string;
  user: UserEntity;
}

export abstract class BuyCourseSagaState {
  public saga: BuyCourseSaga;

  public setContext(saga: BuyCourseSaga) {
    this.saga = saga;
  }

  public abstract pay(): Promise<IPaymentResult>;
  public abstract checkPayment(): Promise<{
    user: UserEntity;
    status: PaymentStatus;
  }>;
  public abstract cancel(): Promise<{ user: UserEntity }>;
}
