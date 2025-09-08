import { Button } from "@/components/ui/button";
import type { IBook } from "@/types";
import React from "react";
import { Link } from "react-router";

type Props = { books: IBook[] };

const BookDisplay: React.FC<Props> = ({ books }) => {
  return (
    <div>
      {books?.map((book: any) => (
        <div
          key={book._id}
          className="border border-muted rounded-lg shadow-md overflow-hidden mb-6 flex flex-col md:flex-row"
        >
          {/* Image */}
          <div className="md:w-2/5 w-full flex-shrink-0">
            <img
              src={book.bookImage}
              alt={book.title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Content */}
          <div className="p-6 flex-1">
            <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
            <p className="text-muted-foreground mb-3">
              {book.shortDescription}
            </p>

            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-primary font-medium">{book.bookType}</span>
              <span className="text-muted-foreground">{book.language}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="font-medium">Author:</span>{" "}
                {book?.authorId?.name || "Unknown"}
              </div>
              <div>
                <span className="font-medium">Status:</span> {book.status}
              </div>
              <div>
                <span className="font-medium">Created:</span>{" "}
                {new Date(book.createdAt).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Updated:</span>{" "}
                {new Date(book.updatedAt).toLocaleDateString()}
              </div>
            </div>

            <Button asChild className="w-full">
              <Link to={`/books/${book._id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookDisplay;
