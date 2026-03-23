import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Attendance from "@/models/Attendance";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });

    await connectDB();
    const userId = (session.user as { id?: string })?.id;
    const role = (session.user as { role?: string })?.role;
    const { searchParams } = new URL(req.url);
    const targetUser = searchParams.get("user");

    const query = role === "admin" && targetUser
      ? { user: targetUser }
      : { user: userId };

    const records = await Attendance.find(query).sort({ date: -1 }).populate("user", "name email").lean();
    return NextResponse.json({ success: true, data: records, total: records.length });
  } catch (error) {
    console.error("[ATTENDANCE GET]", error);
    return NextResponse.json({ success: false, message: "Failed to fetch attendance." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });

    await connectDB();
    const userId = (session.user as { id?: string })?.id;
    const { service, date, notes } = await req.json();

    if (!service || !date) {
      return NextResponse.json({ success: false, message: "Service and date are required." }, { status: 400 });
    }

    const record = await Attendance.create({ user: userId, service, date: new Date(date), notes });
    return NextResponse.json({ success: true, data: record }, { status: 201 });
  } catch (error) {
    console.error("[ATTENDANCE POST]", error);
    return NextResponse.json({ success: false, message: "Failed to record attendance." }, { status: 500 });
  }
}
