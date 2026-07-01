"use client";

import { motion } from "framer-motion";

const paragraphs: string[] = [
  `I grew up in the suburbs of Toronto, Canada (what we call the GTA) in as typical a big, fat, Greek family as you can imagine – I’m closer with all of my cousins than many people are with their own siblings. I was lucky enough to attend The Country Day School in King City all the way from 1st to 12th grade.`,
  `At CDS I debated for four years (representing the school provincially, twice), served on the student council for two, captained our soccer team, and laughed hysterically with my friends at lunch at least a thousand times. My peers chose me as their valedictorian a couple of weeks after the onset of the government lockdowns of 2020. I delivered our speech over a livestream on YouTube.`,
  `I was enrolled at the University of Toronto’s Rotman School of Business but decided to take a gap year to avoid having to go through my first year of college online. Government tyranny and a harsh Canadian winter meant I was stuck inside on most days. I spent my time reading, lifting, and exploring cryptocurrency as a philosophical technology. With the cancelling of standardized testing, becoming disenchanted with Canada, and nothing all that urgent to do, I decided to throw my hat in the ring at three US colleges: UMiami, USC, and Wharton at Penn. Before I knew it, I was off to Southern California, where I would be joining my twin brother who was chasing his dream of becoming a filmmaker.`,
  `That wasn’t before I got caught up in the wild west of the ZIRP era, and became one of the first ever owners of what were called Bored Apes, or what were soon to be known as the face of the most vapid tech development in the history of the internet.`,
  `At the time, though, there was still potential that they would materialize into something valuable - whether that was in the advent of new consumer business models or novel types of investments. The summer of 2021 was dominated by NFTs, and in an effort to be a participant in earnest, I began writing a blog under a pseudonym known as Mr. Fox to explain what exactly it was that these images on the blockchain were about.`,
  `My writing was picked up by Raoul Pal, former head of Goldman Sachs’ Global Macro Fund and CEO of Real Vision, an online investment research publication. As a freshman in college I became Real Vision’s NFT correspondent, and my newsletter was read by over 350,000 curious people weekly. I am thankful that I built a reputation, at least in part, for not shying away from calling out the shallowness of the majority of NFT use cases at the time. I welcomed over 7,500 followers on Twitter and got a taste of how powerful an online personal brand could be.`,
  `Concurrently, I was building Reidar DAO with friends from high school. A decentralized autonomous organization is crypto-speak for a blockchain wallet that can be contributed to and controlled by many people together, as opposed to a single actor.`,
  `While I didn’t entirely realize it at the time, in hindsight, it’s clear that Reidar was my first attempt at company building. While most investment DAOs of the era had their sights set on trading their way to $1B AUM, at Reidar we took a much different approach. Our vision was to create a cash machine, where any individual member could leverage the resources of the organization and its members to develop a line of revenue. This might have looked like crypto consulting, launching DAO tooling software, sponsorship revenue from podcasting efforts, or really anything else. With the cash proceeds, we were to invest in the strongest digital assets. My co-founder Abraham described it as a “Web3 Berkshire Hathaway”.`,
  `We raised $300,000 from ~60 people in our first round. We would go on to raise another ~$200,000 from existing and new members across a number of future rounds. The DAO’s AUM peaked at ~$1,000,000 before coming back down, but we are pleased to have materially outperformed the broader NFT market since inception. I’ve proposed ~50% of Reidar’s investment decisions.`,
  `I think we made a lot of impressive progress towards actualizing our vision, although it was never fully realized. We received over 500 applications to join Reidar and conducted second rounds and interviews with over 100 of them. We deliberately built the team around the skills we were missing, ultimately inviting multiple Big Law lawyers, strong Big Tech product operators, Wall Street quants, and Ivy League students to become members of our organization.`,
  `We also learned a lot about regulation. Starting a blockchain-based investment club during the reign of Gary Gensler was no cake walk, and it involved Abraham and I meeting with various frontier legal consultants, pilfering through clunky government websites, and doing a little bit of hoping for the best. No one has come knocking on our door quite yet.`,
  `DAOs of this time notoriously faced one key issue that became known as the “coordination problem”. There is a reason capitalism is enabled by hierarchies – because they are the inherent infrastructure of human nature. The coordination problem was chiefly concerned with the question, “How do you ensure equal contribution if you’re going to guarantee equal distribution?”. For a deluge of reasons, the answer is that you can’t. So I spent some time designing for Reidar what I called, “The Game”. The Game was a monthly peer prediction exercise whereby members of the DAO ranked each other by effective contribution to the efforts of the organization, where points were distributed on an exponential basis. Your cumulative points total over time (with a built-in decay function) as a proportion of all distributed points served as your share of the revenue distribution. It was my hope that as DAOs became more popular, this could have been a tool we licensed to others who needed it. Unfortunately, DAOs never matured into the consumer finance category many imagined they would.`,
  `We ran a successful media arm to help with Reidar’s publicity as well. We amassed over 5,000 followers across Twitter, Instagram, and TikTok presences, along with a small but passionate podcast fanbase and a weekly newsletter.`,
  `In the end, inspiring this level of joint commitment in the face of a collapsing crypto market proved too difficult, and while the DAO still consists of nearly all of its original members and holdings, efforts to build a business on top of this foundation have since stopped. Only time can tell if this sleeping giant ever wakes up again.`,
  `The next step on my journey to pursue the innovation of NFT technology authentically was joining Fountain – a venture-backed, digital art brokerage – as employee #1 in the summer of 2023.`,
  `There were a few things that excited me about Fountain back then and still do today. Firstly, Steve Jobs is one of my personal heroes, and I think that work at the intersection of art and tech is some of the coolest in the world. Movies in particular were a huge part of my upbringing, so the opportunity to work at one of the forefronts in creative technology was very attractive to me. Further, I appreciated that instead of trying to build a business around a new, unvalidated consumer behaviour as many crypto startups do, Fountain centered itself around meeting customers where they already were: tokenized digital art is a real consumer good, and there are already people that want to buy and sell it.`,
  `On day one, the priority at Fountain was properly positioning the brand. The company was founded to bridge the gap between the sophisticated, digital art-interested collectors of the art world and the overwhelming, convoluted, and oftentimes unserious nature of the crypto universe. Where the majority of blockchain startups opt to pander to crypto-natives in tone, style, and language, we at Fountain took the opposite approach. During our brand design – which I led as the point man between the founders and our outside team – we emphasised above all a refined, white-glove, and institutional presentation.`,
  `Our decision worked from the onset, where within 24 hours we had amassed over 2,000 followers and conducted our first $100,000 in transaction volume. Over the next year, I wore many hats as Fountain learned where to zig and where to zag as newly-minted members of the tradition-steeped art industry. In the beginning, this looked like becoming an expert in the IRS’ treatment of art and collectibles, both from investment and donation perspectives. I worked with clients who had pre-existing digital art collections to conduct full portfolio valuations and discern where donations made the most sense for their situation. We evaluated collections collectively worth over $10M during this process.`,
  `I also worked directly with the CEO to grow the team, recruiting both a software engineer and sales specialist formerly of Christie’s and Sotheby’s to join us on our mission in making digital fine art more accessible.`,
  `Other early responsibilities included learning Carta so as to properly organize our cap table, building out a Salesforce CRM to track our pipeline, handling the entire external-facing presence of the company on socials, arranging our launch party in Marfa, Texas, and getting as much feedback as possible from early customers about where we could be the most helpful.`,
  `The market response to our offering was extraordinary. Approximately 8 months after launch we brokered one of the largest deals in the history of digital art: a $14.5M Autoglyph full set, of which I was the lead analyst on. Fountain would go on to broker over $100M in GMV in the first 36 months from launch.`,
  `We’ve shipped two large extensions to Fountain’s business since our founding. The first of which is FountainGO, a trustless, no fee, peer-to-peer NFT swapping protocol. As the bridge between the world’s most sophisticated collectors and nebulous, crypto-native collectors, some of the most consistent early feedback we received was from professional buyers unwilling to transact for fear of counterparty risk, and we figured this was probably a problem for many of the market’s participants. In response, I worked cross-functionally with our engineer to build FountainGO as a free-to-use public good. We opted for a zero fee structure because a) we think the product has high replicability and fees would have inspired price wars, and b) that a public good would both garner goodwill from the market and act as a strong lead generator. FountainGO has processed over $5M in transaction volume since its birth.`,
  `My favourite thing we’ve built at Fountain, though, is Fountain Vault – an end-to-end solution that allows us to buy and custody any piece of digital art in the world for our clients. One of the largest blockers to our growth was the frequent qualm that while collectors and museums were interested in the medium, the barrier to entry (the complication of the blockchain) was simply too daunting of an idea to overcome. Fountain Vault removes all of the hassle that comes with interfacing with the blockchain to acquire art: all our clients need to do is wire us the total amount for a piece, and we handle literally everything else from purchase to secure storage in a unique, Fountain controlled client wallet. I worked with lawyers, cyber security experts, and our engineering team to build a compliant, internal architecture that allows us to acquire and custody any piece our clients might be interested in. We take great pride in the fact that, through Fountain Vault, we’ve helped many collectors buy their very first piece of digital art.`,
  `A large amount of my time is also dedicated to our lending business, which I lead. We strategically lend ~$1,000,000 on digital fine art, concentrating entirely in pieces at the highest end of the market. While cash management is part of the impetus here, business development is the first priority. By providing financing to some of the medium’s largest collectors, we solidify the relationships that give our clients access to the best works this genre has to offer. With over $6.3M lent, we’ve achieved a realized WAVG APR of ~15.5%.`,
  `We continue to be just as excited about growing Fountain today as we were on Day 1, especially as the lines between old and new across industries further their blurring.`,
  `While Real Vision, Reidar, and Fountain make up the majority of my professional experiences, I also spent some time in college getting involved extracurricularly.`,
  `I served on the executive board of USC’s blockchain club, and was one of the drivers behind the school’s Southern California Blockchain Conference of 2024, where we brought over 1,000 attendees out across two days to listen to talks from the likes of Chris Dixon, Anatoly Yakovenko, and Emad Mostaque.`,
  `I’m perhaps most proud of reviving USC’s Greek club (not to be confused as related to Greek life, but a club for students who are of literal Hellenic descent). Being Greek is core to my identity and upbringing, so I was disappointed when I discovered that our on-campus community had been dissolved in the wake of haphazard leadership. My friends and I revived the club, held a number of events, grew membership to 85 students, and ensured the organization’s long-term survival by instantiating proper succession processes.`,
  `In my free time, you can find me watching soccer, obsessively biohacking, reading, in the gym, or hanging out with my friends!`,
];

export default function About() {
  return (
    <div className="relative min-h-screen bg-white">
      <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="flex w-full items-center justify-between px-6 py-4 md:px-12">
          <a href="/" className="text-lg font-bold text-black">
            George Panos Tsiolis
          </a>
          <nav className="flex items-center gap-8 text-black font-bold tracking-wide">
            <a
              href="/about"
              aria-current="page"
              className="transition-transform duration-200 hover:translate-y-[-1px]"
            >
              <span className="text-sm md:text-base underline decoration-black underline-offset-4">
                About
              </span>
            </a>
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

      <main className="relative z-10 mx-auto max-w-3xl px-6 py-12 md:px-12 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="mb-12 text-3xl font-bold tracking-[0.015em] text-black md:text-4xl lg:text-5xl">
            What I’ve done
          </h1>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 text-base md:text-lg leading-relaxed font-normal text-black"
        >
          {paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </motion.article>

        <div className="mt-16">
          <a
            href="/"
            className="text-sm font-semibold text-black underline decoration-black underline-offset-4 hover:decoration-2"
          >
            ← Back home
          </a>
        </div>
      </main>
    </div>
  );
}
