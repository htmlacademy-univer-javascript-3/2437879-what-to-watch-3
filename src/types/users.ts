export type UserFormValues = {
  email: string;
  password: string;
}

export type AuthInfo = {
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
