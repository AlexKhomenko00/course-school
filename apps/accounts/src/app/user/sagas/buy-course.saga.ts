import { PurchaseState } from '@microservices/interfaces';
import { RMQService } from 'nestjs-rmq';
import { UserEntity } from '../entity/user.entity';
import { BuyCourseSagaState } from './buy-course.state';
import {
  BuyCourseSagaStateCanceled,
  BuyCourseSagaStatePurchased,
  BuyCourseSagaStatePending,
  BuyCourseSagaStateStarted,
} from './buy-courses.steps';

export class BuyCourseSaga {
  private state: BuyCourseSagaState;

  constructor(
    public user: UserEntity,
    public courseId: string,
    public rqmService: RMQService
  ) {
    this.setState(user.getCourseState(courseId), courseId);
  }

  getState() {
    return this.state;
  }

  setState(state: PurchaseState, courseId: string) {
    switch (state) {
      case PurchaseState.Started:
        this.state = new BuyCourseSagaStateStarted();
        break;
      case PurchaseState.Pending:
        this.state = new BuyCourseSagaStatePending();
        break;
      case PurchaseState.Purchased:
        this.state = new BuyCourseSagaStatePurchased();
        break;

      case PurchaseState.Canceled:
        this.state = new BuyCourseSagaStateCanceled();
        break;
      default:
        const _: never = state;
        throw new Error('Invalid BuyCourseSaga state ');
    }
    this.state.setContext(this);
    this.user.setCourseStatus(courseId, state);
  }
}
