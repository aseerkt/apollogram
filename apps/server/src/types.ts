import { Field, ObjectType } from 'type-graphql';
import { createUserLoader } from './dataloaders/createUserLoader';
import { createProfileLoader } from './dataloaders/createProfileLoader';
import { createLikeLoader } from './dataloaders/createLikeLoader';
import { createCommentLoader } from './dataloaders/createCommentLoader';
import { createFollowLoader } from './dataloaders/createFollowLoader';

@ObjectType()
export class FieldError {
  @Field()
  path: string;

  @Field()
  message: string;
}

export interface MyContext {
  req: Request & { username?: string };
  // res: Response & { locals: { username: string } };
  userLoader: ReturnType<typeof createUserLoader>;
  profileLoader: ReturnType<typeof createProfileLoader>;
  commentLoader: ReturnType<typeof createCommentLoader>;
  likeLoader: ReturnType<typeof createLikeLoader>;
  followLoader: ReturnType<typeof createFollowLoader>;
}
