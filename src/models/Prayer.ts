import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPrayer extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  isPublic: boolean;
  category: string;
  prayerCount: number;
  answered: boolean;
  answeredNote?: string;
}

const PrayerSchema = new Schema<IPrayer>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPublic: { type: Boolean, default: true },
    category: { type: String, default: "General", enum: ["Healing", "Family", "Guidance", "Thanksgiving", "General", "Financial", "Relationships"] },
    prayerCount: { type: Number, default: 0 },
    answered: { type: Boolean, default: false },
    answeredNote: { type: String },
  },
  { timestamps: true }
);

const Prayer: Model<IPrayer> =
  mongoose.models.Prayer || mongoose.model<IPrayer>("Prayer", PrayerSchema);

export default Prayer;
