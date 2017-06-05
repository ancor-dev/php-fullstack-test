import { UserInterface } from './users';

export interface CommentInterface {
  id: number;
  content: string;
  published: string;
  author: UserInterface;
}
