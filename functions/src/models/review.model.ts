import { Author } from './author.model';

export interface Review {
  author: Author;
  authorUid: string;
  id: string;
  text: string;
  timestamp: number;
}
