import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IBookStatus, IBookTypes } from "@/types";
import React, { useTransition } from "react";
import { useSearchParams } from "react-router";

type Props = {};

const BookFilter: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectedStatus = searchParams.get("status") || undefined;
  const selectedBookType = searchParams.get("bookType") || undefined;
  const searchQuery = searchParams.get("search") || "";

  const handleStatusChange = (value: IBookStatus) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", value);
    setSearchParams(params);
  };

  const handleBookTypeChange = (value: IBookTypes) => {
    const params = new URLSearchParams(searchParams);
    params.set("bookType", value);
    setSearchParams(params);
  };

  const handleSearchChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      setSearchParams(params);
    });
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("status");
    params.delete("bookType");
    params.delete("search");
    setSearchParams(params);
  };

  return (
    <div className="w-full backdrop-blur-2xl shadow border border-muted rounded-md p-5 space-y-6 bg-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="font-semibold text-lg">Book Filter</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilter}
          className="w-full sm:w-auto"
        >
          Clear Filter
        </Button>
      </div>

      {/* Search Field */}
      <div>
        <Label className="mb-2 block">Search</Label>
        <Input
          type="text"
          placeholder="Search by title..."
          defaultValue={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={isPending ? "opacity-50" : ""}
        />
        {isPending && (
          <p className="text-xs text-muted-foreground mt-1">
            Updating results...
          </p>
        )}
      </div>

      {/* Status Filter */}
      <div>
        <Label className="mb-2 block">Status</Label>
        <Select
          onValueChange={(value) => handleStatusChange(value as IBookStatus)}
          value={selectedStatus}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="ONGOING">Ongoing</SelectItem>
              <SelectItem value="COMPLETE">Complete</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Book Type Filter */}
      <div>
        <Label className="mb-2 block">Book Type</Label>
        <Select
          onValueChange={(value) => handleBookTypeChange(value as IBookTypes)}
          value={selectedBookType}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Book Types</SelectLabel>
              <SelectItem value="NOVEL">Novel</SelectItem>
              <SelectItem value="POEM">Poem</SelectItem>
              <SelectItem value="SHORT_STORY">Short Story</SelectItem>
              <SelectItem value="ACADECIM">Academic</SelectItem>
              <SelectItem value="OTHERS">Others</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BookFilter;
