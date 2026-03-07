import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

interface Film {
  title: string;
  year: string;
  rating: number;
  posterUrl: string;
  letterboxdUrl: string;
}

export async function GET() {
  try {
    const response = await fetch("https://letterboxd.com/George_Tsiolis/rss/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Letterboxd RSS: ${response.status}`);
    }

    const xml = await response.text();
    const $ = cheerio.load(xml, { xmlMode: true });

    const items = $("item");

    for (let i = 0; i < items.length; i++) {
      const item = $(items[i]);

      const rating = parseFloat(item.find("letterboxd\\:memberRating").text()) || 0;
      if (rating < 4.5) continue;

      const isRewatch = item.find("letterboxd\\:rewatch").text().trim().toLowerCase() === "yes";
      if (isRewatch) continue;

      const title = item.find("letterboxd\\:filmTitle").text().trim();
      const year = item.find("letterboxd\\:filmYear").text().trim();
      const letterboxdUrl = item.find("link").text().trim();

      // Extract poster from description HTML
      const descHtml = item.find("description").text();
      const $desc = cheerio.load(descHtml);
      let posterUrl = $desc("img").first().attr("src") || "";

      // Upgrade poster size
      if (posterUrl) {
        posterUrl = posterUrl.replace(/-0-\d+-0-\d+-crop/, "-0-1000-0-1500-crop");
      }

      console.log(`Found matching film: ${title} (${year}) - Rating: ${rating}`);

      const film: Film = {
        title,
        year,
        rating,
        posterUrl,
        letterboxdUrl,
      };

      return NextResponse.json({ film });
    }

    return NextResponse.json(
      { error: "No films found matching criteria" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error fetching Letterboxd data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Letterboxd data" },
      { status: 500 }
    );
  }
}
