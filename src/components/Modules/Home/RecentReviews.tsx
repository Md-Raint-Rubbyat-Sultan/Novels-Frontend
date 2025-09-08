import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useGetRecentReviewsQuery } from "@/redux/features/review/review.api";
import { Star } from "lucide-react";
import type { IBook, IReview, IUser } from "@/types";

const RecentReviews = () => {
  const { data, isLoading, isError } = useGetRecentReviewsQuery({ limit: 5 });

  if (isLoading) {
    return (
      <section className="py-10 container">
        <h2 className="text-foreground text-4xl md:text-5xl font-bold underline underline-offset-8 decoration-primary mb-6">
          Recent Reviews
        </h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !data?.data?.length) {
    return (
      <section className="py-10 container">
        <h2 className="text-foreground text-4xl md:text-5xl font-bold underline underline-offset-8 decoration-primary mb-6">
          Recent Reviews
        </h2>
        <p className="text-muted-foreground">No reviews found.</p>
      </section>
    );
  }

  return (
    <section className="py-10 container">
      <h2 className="text-foreground text-4xl md:text-5xl font-bold underline underline-offset-8 decoration-primary mb-6">
        Recent Reviews
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.data.map((review: IReview, index: number) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Card className="hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-4 p-4">
                <Avatar>
                  <AvatarImage
                    src={(review.reviewerId as IUser)?.picture ?? ""}
                    alt={(review.reviewerId as IUser)?.name ?? "User"}
                  />
                  <AvatarFallback>
                    {(review.reviewerId as IUser)?.name?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {(review.reviewerId as IUser)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Reviewed{" "}
                    <span className="font-semibold">
                      {(review.writerId as IUser)?.name}
                    </span>
                    &apos;s book
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <h3 className="text-xl font-semibold">
                  {(review.bookid as IBook).title}
                </h3>
                <p className="text-sm">{review.review}</p>
                {review.ratings ? (
                  <div className="mt-3 flex items-center gap-1 text-primary text-sm">
                    <Star size={"16px"} className="fill-primary" />{" "}
                    {review.ratings}
                    /5
                  </div>
                ) : (
                  <div className="mt-3 flex items-center gap-1 text-primary text-sm">
                    <Star size={"16px"} /> 0/5
                  </div>
                )}
                <div className="mt-2 text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentReviews;
