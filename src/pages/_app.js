import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
// pages/_app.js
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { Analytics } from '@vercel/analytics/react';

// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-mont" });

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta name="google-site-verification" content="KCBnrfgNbAK2qjD7sX1qxJt-8nHklb8_2x8_bUu94eg" />
        <meta property="og:site_name" content="Anuka Fonseka" />
        <meta name="author" content="Anuka Fonseka" />
      </Head>
      <main
        className={`${montserrat.variable} font-mont  bg-light dark:bg-dark w-full min-h-screen h-full`}
      >
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <AnimatePresence initial={false} mode="wait">
          <Component key={router.asPath} {...pageProps} />
        </AnimatePresence>
        <Analytics />
        {/* <Footer /> */}
        <ChatWidget />
      </main>
    </>
  );
}
