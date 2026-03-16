import crypto from "crypto";
import { NextResponse } from "next/server";

const META_PIXEL_ID = process.env.META_PIXEL_ID;
const META_CONVERSIONS_ACCESS_TOKEN = process.env.META_CONVERSIONS_ACCESS_TOKEN;

export async function POST(request: Request) {
  if (!META_PIXEL_ID || !META_CONVERSIONS_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Meta pixel environment variables are not configured." },
      { status: 500 },
    );
  }

  try {
    const { eventName, userEmail, eventSourceUrl } = await request.json();

    if (!eventName) {
      return NextResponse.json({ error: "eventName is required" }, { status: 400 });
    }

    const userData: Record<string, unknown> = {};

    if (userEmail) {
      const normalized = String(userEmail).trim().toLowerCase();
      const hash = crypto.createHash("sha256").update(normalized).digest("hex");
      userData.em = hash;
    }

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: eventSourceUrl ?? undefined,
          user_data: Object.keys(userData).length ? userData : undefined,
        },
      ],
    };

    const url = new URL(`https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`);
    url.searchParams.set("access_token", META_CONVERSIONS_ACCESS_TOKEN);

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      // eslint-disable-next-line no-console
      console.error("Meta conversion API error:", res.status, text);
      return NextResponse.json(
        { error: "Meta conversion API request failed" },
        { status: 500 },
      );
    }

    const json = await res.json();
    return NextResponse.json({ success: true, response: json });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Meta conversion API unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected error while calling Meta conversion API" },
      { status: 500 },
    );
  }
}

