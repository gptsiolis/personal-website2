import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

interface Essay {
  title: string;
  url: string;
  subtitle: string;
}

export async function GET() {
  try {
    const response = await fetch("https://gptsiolis.substack.com/feed", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Substack feed: ${response.status}`);
    }

    const xml = await response.text();
    const $ = cheerio.load(xml, { xmlMode: true });

    const firstItem = $("item").first();
    if (!firstItem.length) {
      return NextResponse.json(
        { error: "No essays found" },
        { status: 404 }
      );
    }

    const title = firstItem.find("title").first().text().trim();
    const url = firstItem.find("link").first().text().trim();
    const subtitle = firstItem.find("description").first().text().trim();

    if (!title) {
      return NextResponse.json(
        { error: "No essays found" },
        { status: 404 }
      );
    }

    const essay: Essay = { title, url, subtitle };
    console.log("Substack essay parsed:", essay);

    return NextResponse.json({ essay });
  } catch (error) {
    console.error("Error fetching Substack data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Substack data" },
      { status: 500 }
    );
  }
}
