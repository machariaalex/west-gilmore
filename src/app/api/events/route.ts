import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Event from "@/models/Event";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({ date: { $gte: new Date() } }).sort({ date: 1 }).lean();
    return NextResponse.json({ success: true, data: events, total: events.length });
  } catch (error) {
    console.error("[EVENTS GET]", error);
    return NextResponse.json({ success: false, message: "Failed to fetch events." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }
    await connectDB();
    const body = await req.json();
    const event = await Event.create(body);
    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    console.error("[EVENTS POST]", error);
    return NextResponse.json({ success: false, message: "Failed to create event." }, { status: 500 });
  }
}
