import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

interface Book {
  title: string;
  coverUrl: string;
  goodreadsUrl: string;
}

const RSS_URL =
  "https://www.goodreads.com/review/list_rss/64556587?shelf=currently-reading";

export async function GET() {
  try {
    const response = await fetch(RSS_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Goodreads RSS: ${response.status}`);
    }

    const xml = await response.text();
    const $ = cheerio.load(xml, { xmlMode: true });

    const firstItem = $("item").first();
    if (!firstItem.length) {
      return NextResponse.json(
        { error: "No currently reading books found" },
        { status: 404 }
      );
    }

    const title = firstItem.find("title").text().trim();
    const goodreadsUrl = firstItem.find("link").text().trim();
    let coverUrl = firstItem.find("book_large_image_url").text().trim() ||
      firstItem.find("book_medium_image_url").text().trim() ||
      firstItem.find("book_image_url").text().trim() ||
      "";

    if (coverUrl.startsWith("//")) {
      coverUrl = `https:${coverUrl}`;
    }

    const book: Book = {
      title: title || "Currently Reading",
      coverUrl,
      goodreadsUrl: goodreadsUrl || RSS_URL,
    };

    console.log("Goodreads book parsed:", book);

    return NextResponse.json({ book });
  } catch (error) {
    console.error("Error fetching Goodreads data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Goodreads data" },
      { status: 500 }
    );
  }
}
