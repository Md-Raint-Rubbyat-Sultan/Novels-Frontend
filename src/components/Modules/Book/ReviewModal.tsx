"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReviewMutation } from "@/redux/features/review/review.api";
import { Minus, Plus, Star } from "lucide-react";
import { toast } from "sonner";

// ---------------- Schema ----------------
const reviewSchema = z.object({
  ratings: z
    .number()
    .min(1, { message: "Rating must be at least 0" })
    .max(5, { message: "Rating cannot be more than 5" }),
  review: z
    .string()
    .min(5, { message: "Review must be at least 5 characters" }),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

// ---------------- Props ----------------
interface ReviewModalProps {
  writerId: string; // authorId
  bookId: string; // book _id
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  writerId,
  bookId,
}) => {
  const [open, setOpen] = React.useState(false);
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      ratings: 1,
      review: "",
    },
  });

  const onSubmit = async (values: ReviewFormValues) => {
    const toastId = toast.loading("Please wait...");

    const payload = {
      writerId,
      bookid: bookId,
      ratings: values.ratings,
      review: values.review,
    };

    try {
      const result = await createReview(payload).unwrap();
      toast.success(result.message, { id: toastId });
      setOpen(false);
      form.reset();
    } catch (error) {
      console.log(error as any);
      toast.error(
        ((error as Record<string, string | number>).data as any)?.message,
        { id: toastId }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-xl px-6 py-2">
          ⭐ Rate this book
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your thoughts about this book.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Ratings with increment/decrement */}
            <FormField
              control={form.control}
              name="ratings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        disabled={field.value <= 1}
                        onClick={() =>
                          field.onChange(Math.max(1, field.value - 1))
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: field.value }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-6 w-6 text-yellow-500 fill-yellow-500"
                          />
                        ))}
                        {Array.from({ length: 5 - field.value }).map((_, i) => (
                          <Star key={i} className="h-6 w-6 text-gray-300" />
                        ))}
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        disabled={field.value >= 5}
                        onClick={() =>
                          field.onChange(Math.min(5, field.value + 1))
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review text */}
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Write your review..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <motion.div whileTap={{ scale: 0.97 }} className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Review"}
              </Button>
            </motion.div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
