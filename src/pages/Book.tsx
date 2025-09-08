import { useGetAllPublishedBooksQuery } from "@/redux/features/books/books.api";

import { motion } from "framer-motion";

import PaginationUi from "@/components/Layouts/Shared/paginationUi";
import { SkeletonCard } from "@/components/Layouts/Shared/skeletonCard";
import BookDisplay from "@/components/Modules/Book/BookDisplay";
import BookFilter from "@/components/Modules/Book/BookFilter";
import React, { useState } from "react";
import { useSearchParams } from "react-router";

type Props = {};

const Book: React.FC<Props> = () => {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || undefined;
  const bookType = searchParams.get("bookType") || undefined;
  const search = searchParams.get("search") || undefined;

  const { data: books, isLoading } = useGetAllPublishedBooksQuery({
    page,
    limit: 10,
    status,
    bookType,
    searchTerm: search,
  });

  return (
    <div className="container mx-auto px-5 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold mb-6"
      >
        All Books
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-20">
            <BookFilter />
          </div>
        </div>

        <div className="lg:col-span-9">
          {isLoading ? (
            <SkeletonCard />
          ) : books?.data && books.data.length > 0 ? (
            <BookDisplay books={books?.data} />
          ) : (
            <p className="text-muted-foreground">No Book found.</p>
          )}
        </div>
      </div>

      {books?.meta && books.data.length > 0 && (
        <PaginationUi meta={books?.meta} setPage={setPage} />
      )}
    </div>
  );
};

export default Book;
