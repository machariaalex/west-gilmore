import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  location: string;
  image?: string;
  category: string;
  isRecurring: boolean;
  recurringPattern?: string;
  capacity?: number;
  registeredCount: number;
  featured: boolean;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, required: true },
    image: { type: String },
    category: { type: String, default: "General", enum: ["Worship", "Youth", "Community", "Education", "Special", "General"] },
    isRecurring: { type: Boolean, default: false },
    recurringPattern: { type: String },
    capacity: { type: Number },
    registeredCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
