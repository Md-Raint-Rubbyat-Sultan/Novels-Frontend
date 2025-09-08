import type React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { createPageNumber } from "@/utils/createPageNumbers";

interface PaginationProps {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  setPage: (prev: React.SetStateAction<number>) => void;
}

const PaginationUi: React.FC<PaginationProps> = ({ meta, setPage }) => {
  const { page, totalPage } = meta;

  const pages = createPageNumber(page, totalPage);

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => setPage((prev: number) => prev - 1)}
            />
          </PaginationItem>
        )}
        {pages.map((pageNumber, idx) =>
          pageNumber === "..." ? (
            <PaginationItem key={idx}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={idx}>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => setPage(Number(pageNumber))}
                isActive={pageNumber === page}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        {page < totalPage && (
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => setPage((prev: number) => prev + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationUi;
