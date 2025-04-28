export interface IPost {
  _id: string;
  title: string;
  content: string;
  authorId: IUser;
  date: string;
  image: string;
  type: string;
  facebookProfile?: string;
  tags?: string[];
  comments: IComment[];
  reactions: IReaction[];
}

export interface IComment {
  _id: string;
  postId: string;
  userId: {
    _id: string;
    username: string;
    image: string;
  };
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
  _id: string;
  username: string;
  email: string;
  password: string;
  image?: string;
  phone?: string;
}

export interface IProfile {
  user: {
    _id: number;
    username: string;
    email: string;
    image?: string;
    phone?: string;
  };
}
export interface INotification {
  _id: string;
  date: string;
  isRead: boolean;
  message: string;
  postId: string;
  type: string;
  userId: string;
}
export const checkLogin = localStorage.getItem("newBlogToken") ? true : false;
