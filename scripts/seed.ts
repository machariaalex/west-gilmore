/**
 * Seed script — creates a demo admin and a demo member account.
 * Run with:  npx tsx scripts/seed.ts
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI not found in .env.local");
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true, lowercase: true },
  password:   { type: String, required: true },
  role:       { type: String, enum: ["member", "admin", "pastor"], default: "member" },
  joinedDate: { type: Date, default: Date.now },
  isActive:   { type: Boolean, default: true },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

const DEMO_USERS = [
  {
    name:     "Admin User",
    email:    "admin@church.com",
    password: "admin123",
    role:     "admin",
  },
  {
    name:     "John Member",
    email:    "member@church.com",
    password: "member123",
    role:     "member",
  },
];

async function seed() {
  console.log("🔌  Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI as string);
  console.log("✅  Connected.\n");

  for (const u of DEMO_USERS) {
    const existing = await User.findOne({ email: u.email });
    if (existing) {
      console.log(`⚠️   ${u.email} already exists — skipping.`);
      continue;
    }
    const hashed = await bcrypt.hash(u.password, 12);
    await User.create({ ...u, password: hashed });
    console.log(`✅  Created [${u.role}]  ${u.email}  /  ${u.password}`);
  }

  console.log("\n🎉  Seed complete!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
