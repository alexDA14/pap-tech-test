import { User } from './users';

export interface PostsResponse {
  success: boolean;
  response: {
    count: number;
    posts: Post[];
  };
}

export interface Post {
  id: string;
  created: string;
  mediaId: string;
  user: PostUserData;
  likes: number;
  title: string;
  description: string;
  media?: PostMedia;
  userData?: User;
}

export interface PostMediaResponse {
  success: boolean;
  response: {
    media: PostMedia;
  };
}

export interface PostMedia {
  id: string;
  type: string;
  statistics: MediaStatistics;
  urls: MediaUrls;
  owner: PostUserData;
}

export interface PostUserData {
  id: string;
  username: string;
}

export interface MediaStatistics {
  views: number;
  downloads: number;
  likes: number;
  created: number;
}

export interface MediaUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
}
