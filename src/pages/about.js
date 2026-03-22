import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import profile from "../../public/images/profile/coder.png";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";
import { LinkArrow } from "@/components/Icons";

export default function About() {
  return (
    <>
      <Head>
        <title>Who I am - Thilina Fonseka</title>
        <meta name="description" content="Learn more about Thilina Fonseka, a Business Management & Leadership undergraduate passionate about advertising strategy, digital marketing, brand storytelling, and creative problem-solving." />
      </Head>
      <TransitionEffect />
      <main
        className={`flex w-full flex-col items-center justify-center dark:text-light`}
      >
        <Layout className="pt-16">
          <AnimatedText
            text="Passion, Strategy & Creative Vision."
            className="mb-16 !text-8xl !leading-tight lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />

          <div className="grid px-4 w-[75%] mx-auto lg:w-[90%] md:w-full">
            {/* Biography Section - 2/3 width */}
            <div className="flex flex-col items-start justify-start">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75 tracking-wider">
                Biography
              </h2>
              
              <div className="space-y-4 text-justify">
                <p className="font-medium text-dark/90 dark:text-light/90 leading-relaxed">
                  Hello, I&apos;m <span className="text-primary dark:text-primaryDark font-semibold">Thilina Fonseka</span>,
                  a Business Management &amp; Leadership undergraduate (2nd Year) based in Katugastota, Sri Lanka,
                  with a strong passion for advertising strategy, digital marketing, and brand storytelling.
                  I thrive at the intersection of business thinking and creative execution — turning ideas into
                  campaigns that genuinely connect with people.
                </p>

                <p className="font-medium text-dark/90 dark:text-light/90 leading-relaxed">
                  I have hands-on experience running <span className="font-semibold">Meta Ads campaigns</span>,
                  growing Instagram communities to <span className="font-semibold">16k+ followers</span>,
                  building digital product funnels, and publishing on Amazon KDP — experience that has given me
                  a practical understanding of audience behaviour, content strategy, and performance marketing
                  beyond the classroom.
                </p>

                <p className="font-medium text-dark/90 dark:text-light/90 leading-relaxed">
                  Alongside digital work, I&apos;ve led and hosted major campus events including the
                  <span className="font-semibold"> Annual Career Fair 2026</span> Opening Ceremony and the
                  <span className="font-semibold"> Industry Round Table Session 5</span> at NIBM — roles that
                  have sharpened my skills in event communication, audience engagement, and on-the-spot thinking.
                </p>

                <p className="font-medium text-dark/90 dark:text-light/90 leading-relaxed">
                  I bring advanced proficiency in <span className="font-semibold">Canva</span>, fluency across
                  all major social platforms (LinkedIn, Instagram, Facebook, YouTube, TikTok), and a natural
                  ability to communicate clearly and persuasively in both English and Sinhala. I&apos;m eager to
                  bring fresh ideas and real-world energy to a team where strategy meets creativity.
                </p>
              </div>
              
              {/* Quick Links Section */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:thilinafonseka068@gmail.com"
                  className="group flex items-center gap-2 px-4 py-2 bg-dark dark:bg-light 
                  text-light dark:text-dark rounded-lg font-medium transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Get in Touch
                </a>
                
                <Link
                  href="/projects"
                  className="group flex items-center gap-2 px-4 py-2 border-2 border-dark dark:border-light
                  text-dark dark:text-light rounded-lg font-medium transition-all hover:bg-dark
                  hover:text-light dark:hover:bg-light dark:hover:text-dark"
                >
                  View Projects <LinkArrow className="ml-1 !w-6 md:!w-4" />
                </Link>
              </div>
            </div>

            {/* Profile Image Section - 1/3 width, no frame or effects */}
            {/* <div className="col-span-1 h-full md:order-1 flex items-center justify-center">
              <Image
                className="h-auto w-full rounded-2xl"
                src={profile}
                alt="Anuka Fonseka - Software Engineer - Digital Art"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div> */}
          </div>

          <Skills />
          <Experience />
          <Education />
        </Layout>
      </main>
    </>
  );
}