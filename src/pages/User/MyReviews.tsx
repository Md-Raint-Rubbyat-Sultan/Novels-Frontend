import PaginationUi from "@/components/Layouts/Shared/paginationUi";
import { SkeletonCard } from "@/components/Layouts/Shared/skeletonCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetMyReviewsQuery } from "@/redux/features/review/review.api";
import type { IMetaData } from "@/types";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";

type Props = {};

const MyReviews: React.FC<Props> = () => {
  const [page, setPage] = useState<number>(1);
  const { data: myReviews, isLoading } = useGetMyReviewsQuery({
    page,
    limit: 10,
  });

  if (isLoading) return <SkeletonCard />;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold">My Reviews</h2>

      {myReviews?.data?.length === 0 && (
        <p className="text-muted-foreground">
          You haven't written any reviews yet.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {myReviews?.data?.map((review: any) => (
          <Card key={review._id} className="shadow-sm p-2">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={review.writerId?.picture}
                  alt={review.writerId?.name}
                />
                <AvatarFallback>{review.writerId?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{review.writerId?.name}</CardTitle>
                <CardDescription>{review.bookid?.title}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{review.review}</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 text-primary ${
                      i < review.ratings ? "fill-primary" : ""
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {myReviews?.meta && myReviews.data.length > 0 && (
        <PaginationUi meta={myReviews?.meta as IMetaData} setPage={setPage} />
      )}
    </motion.section>
  );
};

export default MyReviews;
