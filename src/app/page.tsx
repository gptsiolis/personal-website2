"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Film {
  title: string;
  year: string;
  rating: number;
  posterUrl: string;
  letterboxdUrl: string;
}

interface Book {
  title: string;
  coverUrl: string;
  goodreadsUrl: string;
}

export default function Home() {
  const [film, setFilm] = useState<Film | null>(null);
  const [filmLoading, setFilmLoading] = useState(true);
  const [filmImageError, setFilmImageError] = useState(false);
  const [book, setBook] = useState<Book | null>(null);
  const [bookLoading, setBookLoading] = useState(true);
  const [bookImageError, setBookImageError] = useState(false);

  useEffect(() => {
    async function fetchFilm() {
      try {
        const response = await fetch("/api/letterboxd", { cache: "no-store" });
        const data = await response.json();
        console.log("Film API response:", data);
        
        if (!response.ok) {
          console.error("Film API error:", response.status, data.error || response.statusText);
          setFilmLoading(false);
          return;
        }
        
        if (data.film) {
          console.log("Setting film:", data.film);
          setFilmImageError(false);
          setFilm(data.film);
        } else {
          console.log("No film data in response");
        }
      } catch (error) {
        console.error("Error fetching film:", error);
      } finally {
        setFilmLoading(false);
      }
    }

    fetchFilm();
  }, []);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch("/api/goodreads", { cache: "no-store" });
        const data = await response.json();
        if (data.book) {
          console.log("Book data received:", {
            title: data.book.title,
            coverUrl: data.book.coverUrl,
          });
          setBookImageError(false);
          setBook(data.book);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setBookLoading(false);
      }
    }

    fetchBook();
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="flex w-full items-center justify-between px-6 py-4 md:px-12">
          <div className="text-lg font-bold text-black">
            George Panos Tsiolis
          </div>
          <nav className="flex items-center gap-8 text-black font-bold tracking-wide">
            <a
              href="https://twitter.com/gptsiolis"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:translate-y-[-1px]"
            >
              <span className="text-sm md:text-base">@gptsiolis</span>
            </a>
            <a
              href="https://www.linkedin.com/in/george-t-a4555a138"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:translate-y-[-1px]"
            >
              <span className="text-sm md:text-base">LinkedIn</span>
            </a>
            <a
              href="https://gptsiolis.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:translate-y-[-1px]"
            >
              <span className="text-sm md:text-base">Writing</span>
            </a>
          </nav>
        </div>
      </header>
      {/* Main content container */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20 lg:px-16 lg:py-24">
        {/* Name at the top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex justify-center md:mb-20 lg:mb-24"
        >
          <h1 className="text-4xl font-bold tracking-[0.025em] text-black md:text-5xl lg:text-6xl xl:text-7xl">
            George Panos Tsiolis
          </h1>
        </motion.div>

        {/* Photo and text section */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-16 mb-24 md:mb-32 lg:mb-40">
          {/* Photo section - left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[450px] w-full flex-shrink-0 lg:h-[550px] lg:w-[420px] xl:h-[650px] xl:w-[520px]"
          >
            <div className="relative h-full w-full">
              <Image
                src="/IMG7162-R01-010.jpg"
                alt="George Panos Tsiolis"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>
          </motion.div>

          {/* Text section - right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-1 flex-col justify-between gap-6 py-2 h-full"
          >
            <div className="space-y-4 pr-2 text-sm leading-[1.55] md:text-base md:leading-[1.65]">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-base font-semibold tracking-[0.015em] text-black md:text-lg"
              >
                Hi, I’m George.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-black"
              >
                I am highly disagreeable and delusionally optimistic. I am a proud
                descendant of my four grandparents, each of whom immigrated from
                Greece to Canada without any education, money, or understanding of
                English. I am less proud of, but still attached to, my hometown
                Toronto Maple Leafs.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-black"
              >
                I am a staunch libertarian and acutely aware of the echo chambers I
                subject myself to. I am as dry a humorist as they come. I am a
                believer in God, science, and the forces that exist between the two
                and beyond our comprehension.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-black"
              >
                I am a major health and fitness nut. I’m a big fan of puzzles, even
                bigger fan of Chelsea, and a much lesser fan of small talk.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-black"
              >
                I am an amateur enthusiast of the work of Phillip Seymour Hoffman,
                Nic Cage, Vince Vaughn, Yorgos Lanthimos, Chris Nolan, The Safdies,
                Fleetwood Mac, Radiohead, U2, Kings of Leon, ATCQ, Dylan, Catfish
                and the Bottlemen, Kanye, Biggie, Led Zeppelin, Pollock, Koons,
                XCOPY, Amaan Jahangir, and diewiththemostlikes. And Steve Jobs,
                Michael Jordan, Carl Jung, and Teddy Santis.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-black"
              >
                This is part of who I am. I’ve also written a slightly longer blurb
                about what I’ve done, which you can read{" "}
                <a
                  href="#"
                  className="underline decoration-black underline-offset-4 hover:decoration-2"
                >
                  here
                </a>
                .
              </motion.p>
            </div>

          </motion.div>
        </div>

        {/* Media grid */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Film section */}
          <div className="flex flex-col items-center gap-6 md:gap-8">
            {film ? (
              <>
                <a
                  href={film.letterboxdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-[220px] h-[320px] md:w-[260px] md:h-[380px] lg:w-[280px] lg:h-[420px] overflow-hidden transition-transform duration-300 hover:scale-105 bg-foreground/5"
                >
                  {film.posterUrl && !filmImageError ? (
                    <Image
                      src={film.posterUrl}
                      alt={`${film.title} (${film.year}) poster`}
                      key={film.posterUrl}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 260px, 280px"
                      unoptimized
                      onError={() => setFilmImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black">
                      <span className="text-xs font-semibold uppercase tracking-wider">No Image</span>
                    </div>
                  )}
                </a>

                <div className="text-center space-y-2">
                  <p className="text-xs md:text-sm text-black font-semibold tracking-[0.3em] uppercase">
                    Last first-time watch that I really enjoyed
                  </p>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.02em] text-black">
                    {film.title}
                    {film.year && <span className="text-black"> ({film.year})</span>}
                  </h2>
                </div>
              </>
            ) : filmLoading ? (
              <>
                <div className="w-[220px] h-[320px] md:w-[260px] md:h-[380px] lg:w-[280px] lg:h-[420px] bg-foreground/5 animate-pulse" />
                <div className="text-center space-y-2">
                  <div className="w-52 h-4 bg-foreground/10 animate-pulse mx-auto" />
                  <div className="w-40 h-6 bg-foreground/10 animate-pulse mx-auto" />
                </div>
              </>
            ) : null}
          </div>

          {/* Currently reading section */}
          <div className="flex flex-col items-center gap-6 md:gap-8">
            {book ? (
              <>
                <a
                  href={book.goodreadsUrl}
            target="_blank"
            rel="noopener noreferrer"
                  className="group relative w-[220px] h-[320px] md:w-[260px] md:h-[380px] lg:w-[280px] lg:h-[420px] overflow-hidden transition-transform duration-300 hover:scale-105 bg-foreground/5"
                >
                  {book.coverUrl && !bookImageError ? (
                    <Image
                      src={book.coverUrl}
                      alt={`${book.title} cover`}
                      key={book.coverUrl}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 260px, 280px"
                      unoptimized
                      onError={() => setBookImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black">
                      <span className="text-xs font-semibold uppercase tracking-wider">No Image</span>
                    </div>
                  )}
                </a>

                <div className="text-center space-y-3">
                  <p className="text-xs md:text-sm text-black font-semibold tracking-[0.3em] uppercase">
                    Currently Reading
                  </p>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.02em] text-black">
                    {book.title}
                  </h2>
                </div>
              </>
            ) : bookLoading ? (
              <>
                <div className="w-[220px] h-[320px] md:w-[240px] md:h-[360px] lg:w-[260px] lg:h-[390px] bg-foreground/5 animate-pulse" />
                <div className="text-center space-y-2">
                  <div className="w-48 h-4 bg-foreground/10 animate-pulse mx-auto" />
                  <div className="w-36 h-6 bg-foreground/10 animate-pulse mx-auto" />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
