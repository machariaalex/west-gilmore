import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAttendance extends Document {
  user: mongoose.Types.ObjectId;
  date: Date;
  service: string;
  notes?: string;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    service: { type: String, required: true, enum: ["Sunday Morning", "Sunday Evening", "Wednesday Bible Study", "Special Service", "Youth Service"] },
    notes: { type: String },
  },
  { timestamps: true }
);

const Attendance: Model<IAttendance> =
  mongoose.models.Attendance || mongoose.model<IAttendance>("Attendance", AttendanceSchema);

export default Attendance;
