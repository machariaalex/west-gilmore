import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Prayer from "@/models/Prayer";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(req.url);
    const mine = searchParams.get("mine") === "true";
    const userId = (session.user as { id?: string })?.id;

    const query = mine
      ? { author: userId }
      : { isPublic: true };

    const prayers = await Prayer.find(query)
      .populate("author", "name avatar")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: prayers, total: prayers.length });
  } catch (error) {
    console.error("[PRAYER GET]", error);
    return NextResponse.json({ success: false, message: "Failed to fetch prayers." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const userId = (session.user as { id?: string })?.id;
    const prayer = await Prayer.create({ ...body, author: userId });
    return NextResponse.json({ success: true, data: prayer }, { status: 201 });
  } catch (error) {
    console.error("[PRAYER POST]", error);
    return NextResponse.json({ success: false, message: "Failed to submit prayer request." }, { status: 500 });
  }
}
