export interface BlogPost {
  id: string | number;
  title: string;
  content: string;
  thumbnail?: string | null;
  tags?: string[];
  views: number;
  status: string
  _count?: {
    comments: number;
  };
  isFeatured?: boolean;
}