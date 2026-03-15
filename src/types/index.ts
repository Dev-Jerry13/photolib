export type Role = "admin" | "user";

export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  role: Role;
  suspended: boolean;
};

export type Post = {
  id: string;
  title: string;
  imageUrl: string;
  mediaType: "photo" | "gif";
  createdBy: string;
  createdAt: string;
};
