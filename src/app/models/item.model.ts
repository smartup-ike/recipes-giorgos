export interface Item {
  id: string;
  image_path?: string;
  title: string;
  description?: string;
}

export interface Items {
  items: Item[];
}
