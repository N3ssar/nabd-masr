import { type ReactNode } from "react";

export interface ApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  category?: string | null;
}
export interface ArticlesListProps {
  articles: ApiArticle[];
}
export interface LayoutProps {
  children: ReactNode;
}

export interface HeaderProps {
  onSearchChange: (query: string) => void;
}

export interface ArticlesListProps {
  articles: ApiArticle[];
  isLoading: boolean;
  query: string;
  error: { type: string; message: string } | null;
}