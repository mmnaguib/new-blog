export interface IPost {
  _id: string | number;
  title: string;
  content: string;
  authorId: number;
  date: string;
  image: string;
  type: string;
  facebookProfile?: string;
  tags?: string[];
  comments: IComment[];
  reactions: IReaction[];
}

export interface IComment {
  _id: string | number;
  postId: string | number;
  userId: string | number;
  content: string;
  date: string;
}

export interface IReaction {
  _id: string | number;
  postId: string | number;
  type: "like" | "love" | "haha" | "angry";
  userIds: (string | number)[];
}

export interface IUser {
  _id: number;
  username: string;
  email: string;
  password: string;
  image?: string;
  phone?: string;
}

export const checkLogin = localStorage.getItem("newBlogToken") ? true : false;
