import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPopularBooksQuery } from "@/redux/features/stats/stats.api";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const PopularBooks = () => {
  const { data, isLoading, isError } = useGetPopularBooksQuery(undefined);

  if (isLoading) {
    return (
      <section className="py-10 container">
        <h2 className="text-foreground text-4xl md:text-5xl font-bold underline underline-offset-8 decoration-primary mb-6">
          Popular Books
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !data?.data?.length) {
    return (
      <section className="py-10 container">
        <h2 className="text-foreground text-4xl md:text-5xl font-bold underline underline-offset-8 decoration-primary mb-6">
          Popular Books
        </h2>
        <p className="text-muted-foreground">No books found.</p>
      </section>
    );
  }

  return (
    <section className="py-10 container">
      <h2 className="text-foreground text-4xl md:text-5xl font-bold underline underline-offset-8 decoration-primary mb-6">
        Popular Books
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.data.map((book: any, index: number) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 py-0">
              <CardHeader className="p-0">
                <img
                  src={book.bookImage}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                  {book.shortDescription}
                </p>
                {book.ratings ? (
                  <div className="mt-3 flex items-center gap-1 text-primary text-sm">
                    <Star size={"16px"} /> {book.ratings.ratings}
                    /5
                  </div>
                ) : (
                  <div className="mt-3 flex items-center gap-1 text-primary text-sm">
                    <Star size={"16px"} /> 0/5
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PopularBooks;
