import { PurchaseState } from '@microservices/interfaces';
import { IsEmail, IsEnum, IsMongoId, IsString } from 'class-validator';

export namespace AccountsChangedCourse {
  export const topic = 'accounts.changed-course.event';

  export class Request {
    @IsMongoId()
    userId: string;

    @IsMongoId()
    courseId: string;

    @IsEnum(PurchaseState)
    state: PurchaseState;
  }
}
