import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISermon extends Document {
  title: string;
  description: string;
  speaker: string;
  topic: string;
  date: Date;
  videoUrl?: string;
  audioUrl?: string;
  thumbnail?: string;
  scripture?: string;
  duration?: string;
  views: number;
  featured: boolean;
}

const SermonSchema = new Schema<ISermon>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    speaker: { type: String, required: true },
    topic: { type: String, required: true },
    date: { type: Date, required: true },
    videoUrl: { type: String },
    audioUrl: { type: String },
    thumbnail: { type: String },
    scripture: { type: String },
    duration: { type: String },
    views: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Sermon: Model<ISermon> =
  mongoose.models.Sermon || mongoose.model<ISermon>("Sermon", SermonSchema);

export default Sermon;
