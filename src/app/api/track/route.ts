import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Visitor } from "@/lib/models";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: Request) {
  await connectDB();
  const userAgent = req.headers.get("user-agent") || "";

  const isBot = /bot|crawl|spider|slurp|bing|facebook|preview/i.test(userAgent);

  if (isBot) {
    return NextResponse.json({ ignored: true });
  }
  
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => {
      const [k, v] = c.split("=");
      return [k, decodeURIComponent(v)];
    }),
  );

  let visitorId = cookies["visitor-id"];
  const now = new Date();

  if (!visitorId) {
    visitorId = uuidv4();
    await Visitor.create({
      visitorId,
      firstVisit: now,
      lastSeen: now,
    });
  } else {
    await Visitor.updateOne(
      { visitorId },
      { $set: { lastSeen: now } },
      { upsert: true },
    );
  }

  const totalVisitors = await Visitor.countDocuments();
  const activeVisitors = await Visitor.countDocuments({
    lastSeen: { $gte: new Date(Date.now() - 5 * 60 * 1000) }, // active within 5 minutes
  });

  const response = NextResponse.json({ totalVisitors, activeVisitors });

  if (!cookies["visitor-id"]) {
    response.headers.set(
      "Set-Cookie",
      `visitor-id=${visitorId}; Path=/; Max-Age=31536000; HttpOnly`,
    );
  }

  return response;
}
