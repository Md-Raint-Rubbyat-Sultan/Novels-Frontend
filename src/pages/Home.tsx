import ContactMe from "@/components/Modules/Home/ContactMe";
import FAQ from "@/components/Modules/Home/FAQ";
import HeroSection from "@/components/Modules/Home/HeroSection";
import MyJourneySection from "@/components/Modules/Home/MyJourneySection";
import PopularBooks from "@/components/Modules/Home/PopularBooks";
import RecentReviews from "@/components/Modules/Home/RecentReviews";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

type Props = {};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Home: React.FC<Props> = () => {
  return (
    <AnimatePresence>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <HeroSection />
      </motion.div>
      {/* my journey */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-16"
      >
        <MyJourneySection />
      </motion.div>
      {/* popular books */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="my-16"
      >
        <PopularBooks />
      </motion.div>
      {/* review */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="my-16"
      >
        <RecentReviews />
      </motion.div>
      {/* FAQ */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="my-16"
      >
        <FAQ />
      </motion.div>
      {/* Contact me */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="my-16"
      >
        <ContactMe />
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
