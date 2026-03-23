import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Sermon from "@/models/Sermon";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(20, parseInt(searchParams.get("limit") ?? "9"));
    const speaker = searchParams.get("speaker");
    const topic = searchParams.get("topic");
    const search = searchParams.get("search");

    const query: Record<string, unknown> = {};
    if (speaker) query.speaker = { $regex: speaker, $options: "i" };
    if (topic) query.topic = { $regex: topic, $options: "i" };
    if (search) query.$or = [
      { title: { $regex: search, $options: "i" } },
      { speaker: { $regex: search, $options: "i" } },
      { topic: { $regex: search, $options: "i" } },
    ];

    const total = await Sermon.countDocuments(query);
    const sermons = await Sermon.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, data: sermons, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("[SERMONS GET]", error);
    return NextResponse.json({ success: false, message: "Failed to fetch sermons." }, { status: 500 });
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
    const sermon = await Sermon.create(body);
    return NextResponse.json({ success: true, data: sermon }, { status: 201 });
  } catch (error) {
    console.error("[SERMONS POST]", error);
    return NextResponse.json({ success: false, message: "Failed to create sermon." }, { status: 500 });
  }
}
