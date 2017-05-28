import { UserInterface } from './users';
export interface PostInterface {
  id: number;
  title: string;
  summary: string;
  content: string;
  published: string;
  author: UserInterface;
}
