import Head from "next/head";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import AnimatedText from "@/components/AnimatedText";
import { motion } from "framer-motion";
import { LinkedInIcon } from "@/components/Icons";

const ContactCard = ({ icon, label, value, href }) => (
  <motion.a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.97 }}
    className="flex items-center gap-5 p-6 rounded-2xl border border-dark/10 dark:border-light/10
      bg-light/60 dark:bg-dark/60 backdrop-blur-sm
      hover:border-dark/30 dark:hover:border-light/30
      hover:shadow-lg dark:hover:shadow-light/5
      transition-all duration-300 group"
  >
    <div className="flex items-center justify-center w-12 h-12 rounded-xl
      bg-dark dark:bg-light text-light dark:text-dark
      group-hover:scale-110 transition-transform duration-300 shrink-0"
    >
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold text-start uppercase tracking-widest text-dark/40 dark:text-light/40 mb-0.5">
        {label}
      </p>
      <p className="text-base font-semibold text-dark dark:text-light">
        {value}
      </p>
    </div>
  </motion.a>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
  </svg>
);

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact me - Thilina Fonseka</title>
        <meta name="description" content="Get in touch with Thilina Fonseka — Advertising Strategist & Business Management undergraduate." />
      </Head>

      <TransitionEffect />

      <main className="flex h-[calc(100vh-5rem)] items-center text-dark dark:text-light overflow-hidden">
        <Layout className="!pt-0 md:!pt-16 sm:!pt-16 flex items-center justify-center">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">

            <AnimatedText
              text="Let's Work Together."
              className="!text-6xl xl:!text-5xl lg:!text-5xl md:!text-4xl sm:!text-3xl mb-4"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-base font-medium text-dark/70 dark:text-light/70 mb-10 max-w-md md:text-sm"
            >
              Have a project in mind or just want to say hello? I&apos;m always open to new opportunities and conversations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full flex flex-col gap-4 mb-8"
            >
              <ContactCard
                icon={<EmailIcon />}
                label="Email"
                value="thilinafonseka068@gmail.com"
                href="mailto:thilinafonseka068@gmail.com"
              />
              <ContactCard
                icon={<PhoneIcon />}
                label="Phone"
                value="+94 77 401 6343"
                href="tel:+94774016343"
              />
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <span className="text-sm font-medium text-dark/40 dark:text-light/40 uppercase tracking-widest">
                Find me on
              </span>
              <div className="flex items-center gap-3">
                <motion.a
                  href="https://www.linkedin.com/in/thilina-fonseka"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="LinkedIn"
                  className="w-6 h-6"
                >
                  <LinkedInIcon />
                </motion.a>
              </div>
            </motion.div>

          </div>
        </Layout>
      </main>
    </>
  );
}