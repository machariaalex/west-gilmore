import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string })?.role;
    if (!session || role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const query = search ? { $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }] } : {};
    const users = await User.find(query).select("-password").sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: users, total: users.length });
  } catch (error) {
    console.error("[USERS GET]", error);
    return NextResponse.json({ success: false, message: "Failed to fetch users." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string })?.role;
    if (!session || role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }
    await connectDB();
    const { id, ...update } = await req.json();
    delete update.password; // never update password via this route
    const user = await User.findByIdAndUpdate(id, update, { new: true }).select("-password");
    if (!user) return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("[USERS PATCH]", error);
    return NextResponse.json({ success: false, message: "Failed to update user." }, { status: 500 });
  }
}
