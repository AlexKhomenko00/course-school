import { IUser, IUserCourses } from '@microservices/interfaces';
import { IsMongoId } from 'class-validator';

export namespace AccountsUserCourses {
  export const topic = 'accounts.user-courses.query';

  export class Request {
    @IsMongoId()
    id: string;
  }

  export class Response {
    courses: IUserCourses[];
  }
}
