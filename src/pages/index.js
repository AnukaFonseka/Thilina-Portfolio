import AnimatedText from "@/components/AnimatedText";
import { HireMe } from "@/components/HireMe";
import { LinkArrow } from "@/components/Icons";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import lightBulb from "../../public/images/svgs/miscellaneous_icons_1.svg";
// import profilePic from "../../public/images/profile/ps2.png";
import profilePic from "../../public/images/profile/thilina/2.jpeg";
import TransitionEffect from "@/components/TransitionEffect";


export default function Home() {
  
  return (
    <>
      <Head>
        <title>Thilina Fonseka - Advertising Strategist</title>
        <meta
          name="description"
          content="Thilina Fonseka is a Business Management & Leadership undergraduate passionate about advertising strategy, digital marketing, brand storytelling, and connecting business ideas with creative execution."
        />
        <meta property="og:title" content="Thilina Fonseka - Advertising Strategist" />
        <meta property="og:description" content="Business Management undergraduate specialising in advertising strategy, social media, and digital marketing." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <TransitionEffect />
      <article
        className={`flex min-h-screen items-center text-dark dark:text-light sm:items-start`}
      >
        <Layout className="!pt-0 md:!pt-16 sm:!pt-16">
          <div className="flex w-full items-start justify-between md:flex-col">
            <div className="w-1/2 lg:hidden md:inline-block md:w-full overflow-hidden h-[88vh] md:h-[55vh]">
              <Image
                src={profilePic}
                alt="Thilina Fonseka"
                className="h-full w-full object-contain object-top"
                sizes="50vw"
                priority
              />
            </div>
            <div className="flex w-1/2 flex-col items-center self-center lg:w-full lg:text-center">
              <AnimatedText
                text="Ideas That Move People. Strategy That Moves Brands."
                className="!text-left !text-6xl xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl"
              />
              <p className="my-4 text-base font-medium md:text-sm sm:!text-xs">
                Business Management &amp; Leadership undergraduate with a passion for advertising strategy, digital marketing, and brand storytelling. I connect creative ideas with business goals — from social media campaigns to live event experiences.
              </p>
              <div className="mt-2 flex items-center self-start lg:self-center">
                <Link
                  href="/about"
                  className={`flex items-center rounded-lg border-2 border-solid bg-dark p-2.5 px-6 text-lg font-semibold
            capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark
            dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
            md:p-2 md:px-4 md:text-base
             `}
                >
                  About Me <LinkArrow className="ml-1 !w-6 md:!w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="ml-4 text-lg font-medium capitalize text-dark underline
                  dark:text-light md:text-base"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Layout>

        {/* <HireMe /> */}
        {/* <div className="absolute right-8 bottom-8 inline-block w-24 md:hidden">
          <Image
            className="relative h-auto w-full"
            src={lightBulb}
            alt="Codebucks"
          />
        </div> */}
      </article>
    </>
  );
}
