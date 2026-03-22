import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import AboutIcon from "./LiIcon";

const Details = ({ type, time, place, info }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <AboutIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">{type}</h3>
        <span className="capitalize text-dark/75 font-medium dark:text-light/50 xs:text-sm">
          {time} | {place}
        </span>
        <p className="font-medium w-full md:text-sm">{info}</p>
      </motion.div>
    </li>
  );
};

const Education = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">Education</h2>

      <div ref={ref} className="relative w-[75%] mx-auto lg:w-[90%] md:w-full">
        <motion.div
          className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-dark  origin-top rounded-full dark:bg-primaryDark dark:shadow-3xl"
          style={{ scaleY: scrollYProgress }}
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4">
          <Details
            type="Bachelor of Management & Leadership"
            time="2026 – 2027 (Reading)"
            place="Coventry University, UK"
            info="Currently pursuing an undergraduate degree in Management & Leadership, building on prior NIBM qualifications through a top-up pathway with Coventry University."
          />

          <Details
            type="Higher National Diploma in Business Management"
            time="2025 – 2026 (Reading)"
            place="National Institute of Business Management (NIBM), Sri Lanka"
            info="Advanced business management studies covering strategic management, marketing, organisational behaviour, and leadership."
          />

          <Details
            type="Advanced Diploma in Business Management"
            time="2024 – 2025"
            place="National Institute of Business Management (NIBM), Sri Lanka"
            info="Comprehensive study of business management principles including marketing, human resource management, and business communication."
          />

          <Details
            type="Diploma in Business Management"
            time="2024"
            place="Australian College of Business and Technology (ACBT), Sri Lanka"
            info="Foundation-level business management qualification covering core principles of management, marketing, and professional communication."
          />

          <Details
            type="International University Foundation in Business"
            time="2023"
            place="Australian College of Business and Technology (ACBT), Sri Lanka"
            info="Pre-degree foundation programme in business, providing preparation for undergraduate-level study in management and related disciplines."
          />

          <Details
            type="Introduction to Public Speaking (Honors Level)"
            time="2022"
            place="American College of Higher Education, Sri Lanka"
            info="Honours-level public speaking programme focusing on persuasive communication, audience engagement, speech delivery, and motivational speaking."
          />

          <Details
            type="G.C.E. Ordinary Level"
            time="2021"
            place="Sri Lanka — Index No. 13582623"
            info="Completed the G.C.E. Ordinary Level national examination with a focus on English language, commerce, and general subjects."
          />
        </ul>
      </div>
    </div>
  );
};

export default Education;
