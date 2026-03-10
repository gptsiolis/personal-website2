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

interface Essay {
  title: string;
  url: string;
  subtitle: string;
}

export default function Home() {
  const [film, setFilm] = useState<Film | null>(null);
  const [filmLoading, setFilmLoading] = useState(true);
  const [book, setBook] = useState<Book | null>(null);
  const [bookLoading, setBookLoading] = useState(true);
  const [essay, setEssay] = useState<Essay | null>(null);
  const [essayLoading, setEssayLoading] = useState(true);

  useEffect(() => {
    async function fetchEssay() {
      try {
        const response = await fetch("/api/substack", { cache: "no-store" });
        const data = await response.json();
        if (data.essay) {
          setEssay(data.essay);
        }
      } catch (error) {
        console.error("Error fetching essay:", error);
      } finally {
        setEssayLoading(false);
      }
    }

    fetchEssay();
  }, []);

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
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-16 mb-12 md:mb-16 lg:mb-20">
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

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
        >
          {/* Essay button */}
          {essay ? (
            <a
              href={essay.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto border-2 border-black px-8 py-4 text-center transition-all duration-200 hover:bg-black hover:text-white"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-1 group-hover:text-white/70">
                Most Recent Essay
              </p>
              <p className="text-sm font-bold tracking-wide">{essay.title}</p>
            </a>
          ) : essayLoading ? (
            <div className="w-full sm:w-64 border-2 border-black/20 px-8 py-4 animate-pulse">
              <div className="w-24 h-3 bg-foreground/10 mx-auto mb-2" />
              <div className="w-40 h-4 bg-foreground/10 mx-auto" />
            </div>
          ) : null}

          {/* Film button */}
          {film ? (
            <a
              href={film.letterboxdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto border-2 border-black px-8 py-4 text-center transition-all duration-200 hover:bg-black hover:text-white"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-1 group-hover:text-white/70">
                Last Film I Loved
              </p>
              <p className="text-sm font-bold tracking-wide">
                {film.title}{film.year && ` (${film.year})`}
              </p>
            </a>
          ) : filmLoading ? (
            <div className="w-full sm:w-64 border-2 border-black/20 px-8 py-4 animate-pulse">
              <div className="w-24 h-3 bg-foreground/10 mx-auto mb-2" />
              <div className="w-40 h-4 bg-foreground/10 mx-auto" />
            </div>
          ) : null}

          {/* Book button */}
          {book ? (
            <a
              href={book.goodreadsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto border-2 border-black px-8 py-4 text-center transition-all duration-200 hover:bg-black hover:text-white"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-1 group-hover:text-white/70">
                Currently Reading
              </p>
              <p className="text-sm font-bold tracking-wide">{book.title}</p>
            </a>
          ) : bookLoading ? (
            <div className="w-full sm:w-64 border-2 border-black/20 px-8 py-4 animate-pulse">
              <div className="w-24 h-3 bg-foreground/10 mx-auto mb-2" />
              <div className="w-40 h-4 bg-foreground/10 mx-auto" />
            </div>
          ) : null}
        </motion.div>
      </main>
    </div>
  );
}
