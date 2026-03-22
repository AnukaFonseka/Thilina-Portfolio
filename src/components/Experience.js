import React, { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const ProjectDetail = ({ title, technologies, achievements }) => {
  return (
    <div className="mt-3 mb-4 pl-4 border-l-2 border-primary/30 dark:border-primaryDark/30">
      <h4 className="font-semibold text-lg text-primary dark:text-primaryDark sm:text-base">
        {title}
      </h4>
      <p className="text-sm text-dark/60 dark:text-light/40 mb-2">
        {technologies}
      </p>
      <ul className="list-disc list-inside space-y-1 text-dark/75 dark:text-light/60 md:text-sm">
        {achievements.map((achievement, index) => (
          <li key={index} className="leading-relaxed">
            {achievement}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Details = ({
  position,
  company,
  companyLink,
  time,
  address,
  work,
  projects,
  showProjects = false,
}) => {
  const ref = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full"
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}{" "}
          {companyLink ? (
            <a
              className="capitalize text-primary dark:text-primaryDark hover:underline"
              href={companyLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{company}
            </a>
          ) : (
            <span className="capitalize text-primary dark:text-primaryDark">
              @{company}
            </span>
          )}
        </h3>
        <span className="capitalize text-dark/75 font-medium dark:text-light/50 xs:text-sm">
          {time} {address && `| ${address}`}
        </span>
        <p className="font-medium w-full mt-2 md:text-sm text-dark/90 dark:text-light/80">
          {work}
        </p>

        {projects && projects.length > 0 && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-primary dark:text-primaryDark font-semibold hover:underline text-sm flex items-center gap-1"
            >
              {isExpanded ? "Hide" : "Show"} Key Projects
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                {projects.map((project, index) => (
                  <ProjectDetail
                    key={index}
                    title={project.title}
                    technologies={project.technologies}
                    achievements={project.achievements}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Leadership
      </h2>

      <div ref={ref} className="relative w-[75%] mx-auto lg:w-[90%] md:w-full">
        <motion.div
          className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-dark 
            origin-top dark:bg-primaryDark dark:shadow-3xl"
          style={{ scaleY: scrollYProgress }}
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            position="Opening Ceremony Compere & Organising Committee"
            company="Annual Career Fair 2026, NIBM"
            time="2026"
            address="Katugastota, Sri Lanka"
            work="Hosted the opening ceremony of NIBM's Annual Career Fair 2026 in front of a large live audience. Supported event coordination, marketing communications, and logistics as a core organising committee member."
          />

          <Details
            position="Compere (Host) & Media Coordinator"
            company="Industry Round Table Session 5, NIBM"
            time="2025"
            address="Katugastota, Sri Lanka"
            work="Hosted the Industry Round Table Session 5 at NIBM, facilitating discussion between industry professionals and students. Supported video editing and media coordination to ensure professional event presentation."
          />

          <Details
            position="Student Representative"
            company="Edex Expo Exhibition 2026"
            time="2026"
            address="Sri Lanka"
            work="Represented NIBM campus at the Edex Expo Exhibition, engaging prospective students and supporting campus promotional activities and brand communications."
          />

          <Details
            position="Team Leader"
            company="BLACKRIO Board Games Team, ACBT Sri Lanka"
            time="2023 – Present"
            address="Sri Lanka"
            work="Led the BLACKRIO Board Games Team during the Indoor Sports Festival for Workplace Communication at ACBT, coordinating team strategy, communication, and engagement."
          />

          <Details
            position="Member"
            company="Startup Hub, NIBM"
            time="2025 – 2026"
            address="Katugastota, Sri Lanka"
            work="Active member of NIBM's entrepreneurial innovation hub, participating in ideation sessions, startup challenges, and collaborative business innovation initiatives."
          />

          <Details
            position="Career Fair Coordination Team Member"
            company="NIBM"
            time="2024 – 2025"
            address="Katugastota, Sri Lanka"
            work="Assisted in coordinating company representatives and student engagement across NIBM's annual career fair, managing communications and on-ground logistics."
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;