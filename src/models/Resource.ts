import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResource extends Document {
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  category: string;
  isPublic: boolean;
  downloadCount: number;
  uploadedBy: mongoose.Types.ObjectId;
}

const ResourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    fileType: { type: String, default: "pdf" },
    category: { type: String, default: "General", enum: ["Bible Study", "Devotional", "Sunday School", "Youth", "Leadership", "General"] },
    isPublic: { type: Boolean, default: true },
    downloadCount: { type: Number, default: 0 },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Resource: Model<IResource> =
  mongoose.models.Resource || mongoose.model<IResource>("Resource", ResourceSchema);

export default Resource;
