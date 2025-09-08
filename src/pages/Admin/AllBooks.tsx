import { SkeletonCard } from "@/components/Layouts/Shared/skeletonCard";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "@/redux/features/books/books.api";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import DeleteConfirmation from "@/components/Layouts/Shared/DeleteConfirmation";
import PaginationUi from "@/components/Layouts/Shared/paginationUi";
import type { IMetaData } from "@/types";
import { toast } from "sonner";

type Props = {};

const AllBooks: React.FC<Props> = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetAllBooksQuery({ page, limit: 10 });
  const [deleteABook, { isLoading: loadingDelet }] = useDeleteBookMutation();

  if (isLoading) return <SkeletonCard />;

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Please wait...");

    try {
      await deleteABook(id).unwrap();
      toast.success("Deleted", { id: toastId });
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
                    <DeleteConfirmation
                      onConfirm={async () => await handleDelete(book._id)}
                    >
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={loadingDelet}
                      >
                        {loadingDelet ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </DeleteConfirmation>
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

export default AllBooks;
