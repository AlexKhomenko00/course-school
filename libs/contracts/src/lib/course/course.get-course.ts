import { ICourse, IUser } from '@microservices/interfaces';
import { IsMongoId } from 'class-validator';

export namespace CourseGetCourse {
  export const topic = 'course.get-course.query';

  export class Request {
    @IsMongoId()
    id: string;
  }

  export class Response {
    course: ICourse | null;
  }
}
