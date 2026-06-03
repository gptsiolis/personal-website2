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
  const [essay, setEssay] = useState<Essay | null>(null);
  const [film, setFilm] = useState<Film | null>(null);
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetch("/api/substack", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => d.essay && setEssay(d.essay))
      .catch((e) => console.error("Error fetching essay:", e));
  }, []);

  useEffect(() => {
    fetch("/api/letterboxd", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => d.film && setFilm(d.film))
      .catch((e) => console.error("Error fetching film:", e));
  }, []);

  useEffect(() => {
    fetch("/api/goodreads", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => d.book && setBook(d.book))
      .catch((e) => console.error("Error fetching book:", e));
  }, []);

  const bullets: { label: string; value: string; url?: string }[] = [
    {
      label: "My most recent essay",
      value:
        essay?.title ??
        "Netflix is about to get Blockbustered, and What the Streaming Service of the AI Era Will Look Like",
      url:
        essay?.url ??
        "https://gptsiolis.substack.com/p/netflix-is-about-to-get-blockbustered",
    },
    {
      label: "Last movie I watched and loved",
      value: film ? `${film.title}${film.year ? ` (${film.year})` : ""}` : "",
      url: film?.letterboxdUrl ?? "",
    },
    {
      label: "Currently reading",
      value: book?.title ?? "",
      url: book?.goodreadsUrl ?? "",
    },
    { label: "On repeat", value: "", url: "" },
    {
      label:
        "The speech I gave my peers as the Valedictorian of the COVID Class (2020)",
      value: "watch on YouTube",
      url: "https://www.youtube.com/watch?v=1wdYv2L0hEA&t=5691s",
    },
    {
      label:
        "My friends voting me out first in our mock Survivor game (because I was the biggest threat — or so I like to tell myself)",
      value: "watch on YouTube",
      url: "https://www.youtube.com/watch?v=pctrJKUyEfI&t=1034s",
    },
  ];

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
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:translate-y-[-1px]"
            >
              <span className="text-sm md:text-base">Resume</span>
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

        {/* Bulleted list — Google Slides style */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl list-none pl-0 space-y-3 text-base md:text-lg text-black leading-relaxed"
        >
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden="true">-</span>
              <span>
                <span className="font-semibold">{b.label}:</span>{" "}
                {b.url ? (
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-black underline-offset-4 hover:decoration-2"
                  >
                    {b.value}
                  </a>
                ) : (
                  <span>{b.value}</span>
                )}
              </span>
            </li>
          ))}
        </motion.ul>
      </main>
    </div>
  );
}
