import PaginationUi from "@/components/Layouts/Shared/paginationUi";
import { SkeletonCard } from "@/components/Layouts/Shared/skeletonCard";
import { AddBookModal } from "@/components/Modules/Book/AddBookModal";
import { UpdateBookModal } from "@/components/Modules/Book/UpdateBookModal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyBooksQuery } from "@/redux/features/books/books.api";
import type { IMetaData } from "@/types";
import { motion } from "framer-motion";
import React, { useState } from "react";

type Props = {};

const MyBooks: React.FC<Props> = () => {
  const [page, setPage] = useState<number>(1);
  const { data: myBooks, isLoading } = useGetMyBooksQuery({ page, limit: 10 });

  if (isLoading) return <SkeletonCard />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">My Books</h1>
        {/* Add Book Button */}
        <AddBookModal />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border shadow">
        <Table>
          <TableCaption>A list of all books you have created.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myBooks && myBooks?.data?.length > 0 ? (
              myBooks.data.map((book: any) => (
                <TableRow key={book._id}>
                  {/* Image */}
                  <TableCell>
                    <img
                      src={book.bookImage}
                      alt={book.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>

                  {/* Title */}
                  <TableCell className="font-medium">{book.title}</TableCell>

                  {/* Description */}
                  <TableCell className="max-w-xs truncate">
                    {book.shortDescription}
                  </TableCell>

                  {/* Type */}
                  <TableCell>{book.bookType}</TableCell>

                  {/* Status */}
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        book.status === "COMPLETE"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {book.status}
                    </span>
                  </TableCell>

                  {/* Created At */}
                  <TableCell>
                    {new Date(book.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Updated At */}
                  <TableCell>
                    {new Date(book.updatedAt).toLocaleDateString()}
                  </TableCell>

                  {/* Action */}
                  <TableCell>
                    <UpdateBookModal bookInfo={book} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  No books found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {myBooks?.meta && myBooks.data.length > 0 && (
        <PaginationUi meta={myBooks.meta as IMetaData} setPage={setPage} />
      )}
    </motion.div>
  );
};

export default MyBooks;
