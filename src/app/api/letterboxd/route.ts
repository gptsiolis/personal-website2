import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

interface Film {
  title: string;
  year: string;
  rating: number;
  posterUrl: string;
  letterboxdUrl: string;
}

// Convert star rating to number (e.g., "★★★★½" = 4.5)
function parseRating(ratingText: string): number {
  if (!ratingText) return 0;
  const fullStars = (ratingText.match(/★/g) || []).length;
  const hasHalfStar = ratingText.includes("½");
  return fullStars + (hasHalfStar ? 0.5 : 0);
}

// Fetch poster from TMDB if API key is available
async function fetchTMDBPoster(title: string, year: string): Promise<string> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) return "";

  try {
    const params = new URLSearchParams({
      api_key: apiKey,
      query: title,
    });
    if (year) params.set("year", year);

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?${params.toString()}`,
      { cache: "no-store" }
    );

    if (!response.ok) return "";

    const data = await response.json();
    const posterPath = data.results?.[0]?.poster_path;
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w780${posterPath}`;
    }
  } catch (error) {
    console.error("Error fetching TMDB poster:", error);
  }
  return "";
}

export async function GET() {
  try {
    console.log("Fetching Letterboxd diary...");
    // Fetch the Letterboxd diary page
    const response = await fetch("https://letterboxd.com/george_tsiolis/diary/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Failed to fetch Letterboxd diary: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch Letterboxd diary: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Get all diary entry rows (most recent first)
    const diaryRows = $("table.diary-table tbody tr");
    console.log(`Found ${diaryRows.length} diary rows`);
    
    let filmsChecked = 0;
    // Find the first film that matches our criteria
    for (let i = 0; i < diaryRows.length; i++) {
      const $row = $(diaryRows[i]);

      // Get film link
      const filmLink = $row.find("a[href*='/film/']").first();
      if (!filmLink.length) continue;

      const filmUrl = filmLink.attr("href");
      if (!filmUrl) continue;

      const fullFilmUrl = filmUrl.startsWith("http")
        ? filmUrl
        : `https://letterboxd.com${filmUrl}`;

      // Extract title
      let title =
        filmLink.find("img").attr("alt") ||
        filmLink.attr("title") ||
        filmLink.attr("data-item-name") ||
        filmLink.text().trim();

      if (!title) continue;

      // Clean up title (remove year if present)
      title = title.split(" (")[0].trim();

      // Extract year from URL or cell
      const yearMatch = filmUrl.match(/\/(\d{4})\//);
      const year = yearMatch
        ? yearMatch[1]
        : $row.find("td.col-releaseyear").text().trim() || "";

      // Extract rating
      const ratingCell = $row.find("td.col-rating");
      const ratingText = ratingCell.text().trim();
      const rating = parseRating(ratingText);

      filmsChecked++;
      console.log(`Checking film ${filmsChecked}: ${title} (${year}) - Rating: ${rating}`);
      
      // Skip if rating is less than 4.5
      if (rating < 4.5) {
        console.log(`  Skipping: rating too low (${rating} < 4.5)`);
        continue;
      }

      // Check if it's a rewatch
      // Letterboxd marks rewatches in the col-rewatch column with an icon-rewatch span
      const rewatchColumn = $row.find("td.col-rewatch, td.js-td-rewatch");
      const rewatchColumnHtml = rewatchColumn.html() || "";
      const isRewatch = rewatchColumn.length > 0 && 
                       rewatchColumnHtml.includes("icon-rewatch") &&
                       rewatchColumn.find("span[class*='icon-rewatch']").length > 0;

      console.log(`  Is rewatch: ${isRewatch}`);

      // Skip if it's a rewatch
      if (isRewatch) {
        console.log(`  Skipping: marked as rewatch`);
        continue;
      }

      // Extract poster URL from row
      let posterUrl = "";
      const posterImg = $row.find("img[src*='ltrbxd.com'], img[data-src*='ltrbxd.com']").first();
      if (posterImg.length) {
        posterUrl = posterImg.attr("data-src") || posterImg.attr("src") || "";
        if (posterUrl && !posterUrl.startsWith("http")) {
          posterUrl = `https://a.ltrbxd.com${posterUrl}`;
        }
        // Upgrade to larger size
        if (posterUrl) {
          posterUrl = posterUrl.replace(/resized\/sm\//, "resized/film-poster/");
        }
      }

      // Try to get poster from film page if not found
      if (!posterUrl || posterUrl.includes("empty-poster")) {
        try {
          const filmPageResponse = await fetch(fullFilmUrl, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            },
            cache: "no-store",
          });

          if (filmPageResponse.ok) {
            const filmHtml = await filmPageResponse.text();
            const $film = cheerio.load(filmHtml);

            const ogImage = $film("meta[property='og:image']").attr("content");
            if (ogImage && ogImage.includes("film-poster")) {
              posterUrl = ogImage;
            }
          }
        } catch (err) {
          console.error("Error fetching film page:", err);
        }
      }

      // Try TMDB as fallback
      if ((!posterUrl || posterUrl.includes("empty-poster")) && process.env.TMDB_API_KEY) {
        const tmdbPoster = await fetchTMDBPoster(title, year);
        if (tmdbPoster) {
          posterUrl = tmdbPoster;
        }
      }

      // Return the first matching film
      console.log(`✓ Found matching film: ${title} (${year}) - Rating: ${rating}`);
      return NextResponse.json({
        film: {
          title,
          year,
          rating,
          posterUrl: posterUrl || "",
          letterboxdUrl: fullFilmUrl,
        },
      });
    }

    // No films found matching criteria
    console.log(`No films found matching criteria (checked ${filmsChecked} films)`);
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

