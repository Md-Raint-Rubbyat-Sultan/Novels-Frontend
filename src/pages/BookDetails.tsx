import { SkeletonCard } from "@/components/Layouts/Shared/skeletonCard";
import { ReviewModal } from "@/components/Modules/Book/ReviewModal";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSingleBooksQuery } from "@/redux/features/books/books.api";
import { motion } from "framer-motion";
import React from "react";
import { Navigate, useParams } from "react-router";
import { toast } from "sonner";

type Props = {};

const BookDetails: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: books,
    isLoading,
    isError,
  } = useGetSingleBooksQuery(id!, {
    skip: !id,
  });

  if (isLoading) return <SkeletonCard />;

  if (isError) {
    toast.error("Please subscribe to read the book");
    return <Navigate to={"/pricing"} />;
  }

  if (!books)
    return (
      <section className="py-10 container">
        <h2 className="text-foreground text-4xl md:text-5xl font-bold underline underline-offset-8 decoration-primary mb-6">
          Book not found.
        </h2>
        <p className="text-muted-foreground">No book found.</p>
      </section>
    );

  const book = books.data;

  return (
    <div className="flex flex-col items-center px-6 py-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="w-full max-w-3xl mb-6">
        <Card className="rounded-2xl shadow-md overflow-hidden">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
            <img
              src={book.bookImage}
              alt={book.title}
              className="w-40 h-56 object-cover rounded-xl shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-gray-600 mb-2">{book.shortDescription}</p>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span className="font-medium text-green-700">
                  {book.status}
                </span>
              </p>
              <div className="mt-4">
                <ReviewModal
                  bookId={book._id}
                  writerId={book.authorId as string}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl space-y-10">
        {book.content.map((chapter, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="rounded-2xl shadow-sm border border-gray-200 bg-white">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  {chapter.chapter}
                </h2>
                <p className="whitespace-pre-line leading-relaxed text-gray-700">
                  {chapter.story}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
