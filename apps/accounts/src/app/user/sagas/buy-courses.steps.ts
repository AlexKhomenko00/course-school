import {
  CourseGetCourse,
  PaymentCheck,
  PaymentGenerateLink,
  PaymentStatus,
} from '@microservices/contracts';
import { PurchaseState } from '@microservices/interfaces';
import { UserEntity } from '../entity/user.entity';
import { BuyCourseSagaState, IPaymentResult } from './buy-course.state';

export class BuyCourseSagaStateStarted extends BuyCourseSagaState {
  public async pay(): Promise<IPaymentResult> {
    const { course } = await this.saga.rqmService.send<
      CourseGetCourse.Request,
      CourseGetCourse.Response
    >(CourseGetCourse.topic, { id: this.saga.courseId });
    if (!course) {
      throw new Error('Course not found');
    }

    if (course.price === 0) {
      this.saga.setState(PurchaseState.Purchased, course._id);
      return { paymentLink: null, user: this.saga.user };
    }

    const { paymentLink } = await this.saga.rqmService.send<
      PaymentGenerateLink.Request,
      PaymentGenerateLink.Response
    >(PaymentGenerateLink.topic, {
      courseId: course._id,
      userId: this.saga.user._id,
      sum: course.price,
    });
    this.saga.setState(PurchaseState.Pending, course._id);
    return { paymentLink, user: this.saga.user };
  }

  public checkPayment(): Promise<{ user: UserEntity; status: PaymentStatus }> {
    throw new Error('Not able to check non-started payment.');
  }

  public async cancel(): Promise<{ user: UserEntity }> {
    this.saga.setState(PurchaseState.Canceled, this.saga.courseId);
    return { user: this.saga.user };
  }
}

export class BuyCourseSagaStatePending extends BuyCourseSagaState {
  public pay(): Promise<IPaymentResult> {
    throw new Error("Can't create link when payment is pending!");
  }
  public async checkPayment(): Promise<{
    user: UserEntity;
    status: PaymentStatus;
  }> {
    const { status } = await this.saga.rqmService.send<
      PaymentCheck.Request,
      PaymentCheck.Response
    >(PaymentCheck.topic, {
      courseId: this.saga.courseId,
      userId: this.saga.user._id,
    });

    switch (status) {
      case 'canceled':
        this.saga.setState(PurchaseState.Canceled, this.saga.courseId);
        break;
      case 'success':
        this.saga.setState(PurchaseState.Purchased, this.saga.courseId);
        break;
    }

    return { user: this.saga.user, status };
  }
  public cancel(): Promise<{ user: UserEntity }> {
    throw new Error("Can't cancel pending payment!");
  }
}

export class BuyCourseSagaStatePurchased extends BuyCourseSagaState {
  public pay(): Promise<IPaymentResult> {
    throw new Error('Course already bought!');
  }
  public checkPayment(): Promise<{ user: UserEntity; status: PaymentStatus }> {
    throw new Error("Can't check status for already bought course");
  }
  public cancel(): Promise<{ user: UserEntity }> {
    throw new Error("Can't cancel payment already bought course");
  }
}

export class BuyCourseSagaStateCanceled extends BuyCourseSagaState {
  public pay(): Promise<IPaymentResult> {
    this.saga.setState(PurchaseState.Started, this.saga.courseId);
    return this.saga.getState().pay();
  }
  public checkPayment(): Promise<{ user: UserEntity; status: PaymentStatus }> {
    throw new Error("Can't check status for canceled course");
  }
  public cancel(): Promise<{ user: UserEntity }> {
    throw new Error('Course already canceled');
  }
}
