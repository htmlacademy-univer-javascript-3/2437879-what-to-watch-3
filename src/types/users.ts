export type ImageUrl = string;

export type UserFormValuesType = {
  email: string;
  password: string;
}

export type AuthInfoType = {
  name: string;
  avatarUrl: string;
  email: string;
  token: string;
};

export type CommentType = {
  id: string;
  date: string;
  user: string;
  comment: string;
  rating: number;
};
