export interface Item {
  id: string;
  imageUrl?: string;
  title: string;
  description?: string;
}

export interface Items {
  items: Item[];
}
