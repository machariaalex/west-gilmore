export interface SermonData {
  _id: string;
  title: string;
  description: string;
  speaker: string;
  topic: string;
  date: string;
  videoUrl?: string;
  audioUrl?: string;
  thumbnail?: string;
  scripture?: string;
  duration?: string;
  views: number;
  featured: boolean;
}

export interface EventData {
  _id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  image?: string;
  category: string;
  featured: boolean;
  registeredCount: number;
}

export interface GalleryData {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  createdAt: string;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: "member" | "admin" | "pastor";
  avatar?: string;
  phone?: string;
  bio?: string;
  joinedDate: string;
}

export interface PrayerData {
  _id: string;
  title: string;
  content: string;
  author: { name: string; avatar?: string };
  isPublic: boolean;
  category: string;
  prayerCount: number;
  answered: boolean;
  createdAt: string;
}

export interface NewsData {
  _id: string;
  title: string;
  content: string;
  author: { name: string };
  category: string;
  isPublic: boolean;
  image?: string;
  pinned: boolean;
  createdAt: string;
}

export interface AttendanceData {
  _id: string;
  user: { name: string; email: string };
  date: string;
  service: string;
  notes?: string;
}

export interface ResourceData {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  category: string;
  isPublic: boolean;
  downloadCount: number;
  createdAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  total?: number;
  page?: number;
  totalPages?: number;
}
