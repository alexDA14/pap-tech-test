export interface UserResponse {
  success: boolean;
  response: {
    user: User;
  };
}

export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_images: UserImages;
}

export interface UserImages {
  small: string;
  medium: string;
  large: string;
}
