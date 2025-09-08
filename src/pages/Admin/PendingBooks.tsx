import PaginationUi from "@/components/Layouts/Shared/paginationUi";
import { SkeletonCard } from "@/components/Layouts/Shared/skeletonCard";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAddBookMutation,
  useGetAllPendingBooksQuery,
} from "@/redux/features/books/books.api";
import type { IBookStatusType, IMetaData } from "@/types";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {};

const PendingBooks: React.FC<Props> = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetAllPendingBooksQuery({ page, limit: 10 });
  const [addBook, { isLoading: loadAdd }] = useAddBookMutation();

  if (isLoading) return <SkeletonCard />;

  const handleAdd = async (_id: string, status: IBookStatusType) => {
    const toastId = toast.loading("Please wait...");

    try {
      await addBook({ _id, status });
      toast.success(status, { id: toastId });
    } catch (error) {
      console.log(error as any);
      toast.error(
        ((error as Record<string, string | number>).data as any)?.message,
        { id: toastId }
      );
    }
  };

  if (isLoading) return <SkeletonCard />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 space-y-8"
    >
      <h1 className="text-2xl font-bold">All Books</h1>

      <div className="overflow-x-auto rounded-lg border shadow">
        <Table>
          <TableCaption>A list of all books in the system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Book Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data?.data?.length > 0 ? (
              data.data.map((book: any) => (
                <TableRow key={book._id}>
                  <TableCell>
                    <img
                      src={book.bookImage}
                      alt={book.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {book.shortDescription}
                  </TableCell>
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
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        book.bookStatus === "ACCEPTED"
                          ? "bg-green-100 text-green-700"
                          : book.bookStatus === "PENDING"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {book.bookStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Button
                        onClick={() => handleAdd(book._id, "ACCEPTED")}
                        size="sm"
                        variant="default"
                        disabled={loadAdd}
                      >
                        ADD
                      </Button>
                      <Button
                        onClick={() => handleAdd(book._id, "REJECTED")}
                        size="sm"
                        variant="destructive"
                        disabled={loadAdd}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No books found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {data?.meta && data.data.length > 0 && (
        <PaginationUi meta={data.meta as IMetaData} setPage={setPage} />
      )}
    </motion.div>
  );
};

export default PendingBooks;
