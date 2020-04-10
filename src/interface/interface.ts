export type Tag = {
  name: string;
  id: string;
}

export type Category = {
  name: string;
  id: string;
}

export type Paragraph = {
  id: number;
  description: string;
  preview: string;
  paragraph: string;
  paragraphLink?: string;
  headPicture: string;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  category: string;
  title: string;
}