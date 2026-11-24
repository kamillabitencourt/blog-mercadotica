export interface News extends NewsPart {
  content: string;
  createdAt:
    | number
    | {
        seconds: number;
      };
  editedAt?:
    | number
    | {
        seconds: number;
      };
  relatedNews: {
    title: string;
    slug: string;
  }[];
}

export interface NewsPart {
  title: string;
  imageURL: string;
  slug: string;
  categories: number[];
  keywords: {
    text: string;
  }[];
  description: string;
  createdAt?: number | { seconds: number };
}
