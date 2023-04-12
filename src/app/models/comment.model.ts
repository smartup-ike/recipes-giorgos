import { Author } from './author.model';

export interface Comment {
  author: Author;
  authorUid: string;
  id: string;
  text: string;
  timestamp: number;
}
