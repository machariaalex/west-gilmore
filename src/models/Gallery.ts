import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGallery extends Document {
  title: string;
  description?: string;
  imageUrl: string;
  publicId?: string;
  category: string;
  featured: boolean;
  uploadedBy: mongoose.Types.ObjectId;
}

const GallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    publicId: { type: String },
    category: { type: String, default: "General", enum: ["Worship", "Events", "Community", "Youth", "General"] },
    featured: { type: Boolean, default: false },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Gallery: Model<IGallery> =
  mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);

export default Gallery;
