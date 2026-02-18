import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

interface Book {
  title: string;
  coverUrl: string;
  goodreadsUrl: string;
}

const GOODREADS_URL =
  "https://www.goodreads.com/review/list/64556587?shelf=currently-reading";

export async function GET() {
  try {
    const response = await fetch(GOODREADS_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Goodreads page: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Goodreads uses rows with id like review_########
    const row = $("tr[id^='review_']").first();
    if (!row?.length) {
      return NextResponse.json(
        { error: "No currently reading books found" },
        { status: 404 },
      );
    }

    const titleLink = row.find("a.bookTitle").first();

    const metaDescription =
      $("meta[name='description']").attr("content") ||
      $("meta[property='og:description']").attr("content") ||
      "";
    const metaMatch = metaDescription.match(/shelf:\s*(.+?)\s+by\s+/i);
    const metaTitle = metaMatch?.[1]?.trim() || "";

    const attributeTitle = titleLink.attr("title")?.trim() || "";
    const linkText = titleLink
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .replace(/\s+/g, " ")
      .trim();

    const cellTitle = row
      .find("td.field.title .value")
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .replace(/\s+/g, " ")
      .trim();

    const titleCandidates = [
      metaTitle,
      attributeTitle,
      linkText,
      cellTitle,
    ].filter(Boolean);

    const title = titleCandidates[0] || "Currently Reading";

    const goodreadsUrl = titleLink.attr("href")
      ? `https://www.goodreads.com${titleLink.attr("href")}`
      : GOODREADS_URL;

    let coverImg =
      row.find("td.field.cover img").attr("src") ||
      row.find("img").first().attr("src") ||
      "";

    if (coverImg.startsWith("//")) {
      coverImg = `https:${coverImg}`;
    }

    coverImg = coverImg.replace(/_SY\d+_/i, "_SY475_");

    const book: Book = {
      title: title || "Currently Reading",
      coverUrl: coverImg || "",
      goodreadsUrl,
    };

    console.log("Goodreads book parsed:", book);

    return NextResponse.json({ book });
  } catch (error) {
    console.error("Error fetching Goodreads data:", error);
    return NextResponse.json({
      book: {
        title: "The Divine Comedy",
        coverUrl: "",
        goodreadsUrl:
          "https://www.goodreads.com/book/show/6656.The_Divine_Comedy",
      },
    });
  }
}


