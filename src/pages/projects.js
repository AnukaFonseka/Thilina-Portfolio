import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { projects } from "@/data/projectsData";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import TransitionEffect from "@/components/TransitionEffect";

// ─── p1 images (Meta Ads) ────────────────────────────────────────────────────
import p1_1 from "../../public/images/projects/p1/1.jpeg";
import p1_2 from "../../public/images/projects/p1/2.jpeg";
import p1_3 from "../../public/images/projects/p1/3.jpeg";
import p1_4 from "../../public/images/projects/p1/4.jpeg";
import p1_5 from "../../public/images/projects/p1/5.jpeg";
import p1_6 from "../../public/images/projects/p1/6.jpeg";
import p1_7 from "../../public/images/projects/p1/7.jpeg";
import p1_8 from "../../public/images/projects/p1/8.jpeg";
import p1_9 from "../../public/images/projects/p1/9.jpeg";
import p1_10 from "../../public/images/projects/p1/10.jpeg";
import p1_11 from "../../public/images/projects/p1/11.jpeg";
import p1_12 from "../../public/images/projects/p1/12.jpeg";

// ─── p2 images (Instagram Growth) ───────────────────────────────────────────
import p2_1 from "../../public/images/projects/p2/1.png";
import p2_2 from "../../public/images/projects/p2/2.png";
import p2_3 from "../../public/images/projects/p2/3.png";
import p2_4 from "../../public/images/projects/p2/4.png";
import p2_5 from "../../public/images/projects/p2/5.png";
import p2_6 from "../../public/images/projects/p2/6.jpeg";

// ─── p3 images (Amazon KDP) ──────────────────────────────────────────────────
import p3_1 from "../../public/images/projects/p3/1.jpeg";
import p3_2 from "../../public/images/projects/p3/2.jpeg";
import p3_3 from "../../public/images/projects/p3/3.jpeg";
import p3_4 from "../../public/images/projects/p3/4.jpeg";
import p3_5 from "../../public/images/projects/p3/5.jpeg";
import p3_6 from "../../public/images/projects/p3/6.jpeg";

const projectImages = {
  "meta-ads-campaign": [p1_1, p1_2, p1_3, p1_4, p1_5, p1_6, p1_7, p1_8, p1_9, p1_10, p1_11, p1_12],
  "instagram-growth-funnel": [p2_1, p2_2, p2_3, p2_4, p2_5, p2_6],
  "amazon-kdp-publishing": [p3_1, p3_2, p3_3, p3_4, p3_5, p3_6],
};

// ─── Image Slider ─────────────────────────────────────────────────────────────
const ImageSlider = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 800 : -800, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (d) => ({ zIndex: 0, x: d < 0 ? 800 : -800, opacity: 0 }),
  };

  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;
  const swipeThreshold = 10000;

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = images.length - 1;
      if (next >= images.length) next = 0;
      return next;
    });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl group">
      <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeThreshold) paginate(1);
              else if (swipe > swipeThreshold) paginate(-1);
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              className="h-full w-full object-contain"
              alt={`${title} – image ${currentIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Counter badge */}
        <div className="absolute top-3 right-3 z-10 bg-dark/60 dark:bg-light/60 text-light dark:text-dark text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); paginate(-1); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-dark/60 dark:bg-light/60
                       text-light dark:text-dark rounded-full p-2 opacity-0 group-hover:opacity-100
                       transition-opacity duration-300 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); paginate(1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-dark/60 dark:bg-light/60
                       text-light dark:text-dark rounded-full p-2 opacity-0 group-hover:opacity-100
                       transition-opacity duration-300 backdrop-blur-sm"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 bg-primary dark:bg-primaryDark"
                  : "w-1.5 bg-light/50 dark:bg-dark/50 hover:bg-light/80 dark:hover:bg-dark/80"
              }`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Metric card ─────────────────────────────────────────────────────────────
const Metric = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-3xl font-bold text-primary dark:text-primaryDark xl:text-2xl sm:text-xl">
      {value}
    </span>
    <span className="text-xs font-semibold uppercase tracking-widest text-dark/50 dark:text-light/50">
      {label}
    </span>
  </div>
);

// ─── Single project section ───────────────────────────────────────────────────
const ProjectSection = ({ project, images, index }) => {
  const isEven = index % 2 === 0;

  const contentSide = (
    <div className="flex flex-col gap-8 justify-center">
      {/* Overview */}
      <p className="text-base font-medium leading-relaxed text-dark/75 dark:text-light/75 sm:text-sm">
        {project.overview}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-6 py-6 border-t border-b border-dark/15 dark:border-light/15">
        {project.metrics.map((m, i) => (
          <Metric key={i} {...m} />
        ))}
      </div>

      {/* Responsibilities */}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-dark/40 dark:text-light/40">
          Responsibilities
        </h3>
        <ul className="space-y-2">
          {project.responsibilities.map((r, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-medium text-dark/80 dark:text-light/80">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary dark:bg-primaryDark" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-dark/40 dark:text-light/40">
          Skills Demonstrated
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.skills.map((s, i) => (
            <span
              key={i}
              className="rounded-full border border-dark/20 dark:border-light/20 px-3 py-1 text-xs font-semibold
                         text-dark/70 dark:text-light/70 hover:border-primary dark:hover:border-primaryDark
                         hover:text-primary dark:hover:text-primaryDark transition-colors duration-200"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const imageSide = (
    <div className="flex flex-col gap-6">
      <ImageSlider images={images} title={project.title} />

      {/* Key insights */}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-dark/40 dark:text-light/40">
          Key Insights
        </h3>
        <ul className="space-y-2.5">
          {project.insights.map((insight, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-dark/70 dark:text-light/70">
              <span className="mt-2 h-px w-5 flex-shrink-0 bg-primary dark:bg-primaryDark" />
              {insight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, margin: "-80px" }}
      className="w-full pt-20 pb-4 border-t border-dark/15 dark:border-light/15 first:border-t-0"
    >
      {/* Project header */}
      <div className="mb-10 flex items-start gap-6 md:gap-4">
        {/* Large background number */}
        <span
          className="select-none text-[7rem] font-black leading-none text-dark/8 dark:text-light/8
                     xl:text-[5.5rem] md:text-[4rem] sm:text-[3rem] flex-shrink-0"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex flex-col gap-2 pt-4">
          {/* Type badge */}
          <span className="w-fit rounded-full border border-primary dark:border-primaryDark px-3 py-0.5
                           text-xs font-bold uppercase tracking-widest text-primary dark:text-primaryDark">
            {project.type}
          </span>
          {/* Title */}
          <h2 className="text-4xl font-bold leading-tight xl:text-3xl lg:text-2xl sm:text-xl">
            {project.title}
          </h2>
          {/* Subtitle */}
          <p className="text-base font-medium text-dark/50 dark:text-light/50 sm:text-sm">
            {project.subtitle}
          </p>
        </div>
      </div>

      {/* Main two-column layout — alternating */}
      <div className="grid grid-cols-12 gap-12 xl:gap-8 lg:grid-cols-1 lg:gap-10">
        {/* Content — always col-span-5; order swaps it left/right */}
        <div className={`col-span-5 lg:col-span-12 ${isEven ? "order-1" : "order-2 lg:order-1"}`}>
          {contentSide}
        </div>
        {/* Image — always col-span-7; order swaps it left/right */}
        <div className={`col-span-7 lg:col-span-12 ${isEven ? "order-2" : "order-1 lg:order-2"}`}>
          {imageSide}
        </div>
      </div>
    </motion.section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects – Thilina Fonseka</title>
        <meta
          name="description"
          content="Marketing project case studies by Thilina Fonseka — covering Meta Ads campaign management, Instagram audience growth, digital product funnels, and Amazon KDP publishing."
        />
      </Head>

      <TransitionEffect />
      <main className="mb-16 flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Strategy. Content. Results."
            className="mb-4 !text-7xl !leading-tight lg:!text-6xl sm:mb-4 sm:!text-5xl xs:!text-3xl"
          />
          <div className="flex items-center justify-center">
          <p className="mb-16 max-w-2xl text-base font-medium text-dark/60 dark:text-light/60 sm:mb-10 sm:text-sm text-center">
            A collection of real-world marketing projects — from paid ad campaigns and social media
            growth to digital product funnels and e-commerce publishing.
          </p>
          </div>

          <div className="flex flex-col">
            {projects.map((project, index) => (
              <ProjectSection
                key={project.slug}
                project={project}
                images={projectImages[project.slug]}
                index={index}
              />
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
}
