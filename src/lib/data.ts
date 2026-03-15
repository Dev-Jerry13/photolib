import bcrypt from "bcryptjs";
import { Post, UserRecord } from "@/types";

const adminHash = bcrypt.hashSync("Admin@12345", 10);
const userHash = bcrypt.hashSync("User@12345", 10);

export const users: UserRecord[] = [
  {
    id: "u-admin",
    email: "admin@photolib.dev",
    passwordHash: adminHash,
    role: "admin",
    suspended: false
  },
  {
    id: "u-1",
    email: "user@photolib.dev",
    passwordHash: userHash,
    role: "user",
    suspended: false
  }
];

export const posts: Post[] = [
  {
    id: "p-1",
    title: "Coastal sunset",
    imageUrl: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80",
    mediaType: "photo",
    createdBy: "u-admin",
    createdAt: new Date().toISOString()
  },
  {
    id: "p-2",
    title: "Golden city lights",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    mediaType: "photo",
    createdBy: "u-1",
    createdAt: new Date().toISOString()
  },
  {
    id: "p-3",
    title: "Animated mood board",
    imageUrl: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
    mediaType: "gif",
    createdBy: "u-admin",
    createdAt: new Date().toISOString()
  }
];
