import { ArrowRight } from "lucide-react";
import profile from "@/assets/images/profile.jpg";
import { Button } from "@/components/ui/button";
import type React from "react";
import { motion } from "motion/react";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { Link } from "react-router";

type Props = {};

const HeroSection: React.FC<Props> = () => {
  const { data: user, isLoading } = useGetMeQuery(undefined);

  return (
    <section className="py-16">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-2 md:order-1">
            <h1 className="my-6 text-pretty text-4xl italic font-bold lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-secondary-foreground to-primary">
              BOOK WORM
            </h1>
            <div className="text-muted-foreground mb-8 max-w-xl lg:text-xl space-y-2">
              <p>
                Learn to read, only then you can learn things by reading and it
                will grow you up. The people who don't read books are the people
                who actually don't know what learning feels like.
              </p>
              <p className="text-end">- Sltan Khan Borno</p>
            </div>
            <div className="flex w-4/5 flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button asChild className="w-full sm:w-auto">
                <Link to={"/books"}>Books</Link>
              </Button>

              {!isLoading && !user?.data.email && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link to={"/login"}>
                    <span>Sign Up</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            src={profile}
            alt="Author of the site"
            className="max-h-96 w-full rounded-md object-cover order-1 md:order-2"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
