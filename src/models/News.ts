import mongoose, { Schema, Document, Model } from "mongoose";

export interface INews extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  category: string;
  isPublic: boolean;
  image?: string;
  pinned: boolean;
}

const NewsSchema = new Schema<INews>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, default: "Announcement", enum: ["Announcement", "Newsletter", "Bulletin", "Leadership Message"] },
    isPublic: { type: Boolean, default: false },
    image: { type: String },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const News: Model<INews> =
  mongoose.models.News || mongoose.model<INews>("News", NewsSchema);

export default News;
