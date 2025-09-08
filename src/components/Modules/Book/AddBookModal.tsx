import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import type { IImageUpload } from "@/types";
import SingleImageUpload from "@/components/Layouts/Shared/SingleImageUpload";
import { useCerateABookMutation } from "@/redux/features/books/books.api";

// ---------------- Schema ----------------
const bookSchema = z.object({
  title: z.string().min(1, { message: "Title too short." }),
  content: z
    .array(
      z.object({
        chapter: z.string().min(1, { message: "Chapter title required." }),
        story: z.string().min(1, { message: "Story required." }),
      })
    )
    .min(1, { message: "At least one chapter is required." }),
  shortDescription: z.string().optional(),
  bookType: z
    .enum(
      Object.values({
        NOVEL: "NOVEL",
        POEM: "POEM",
        SHORT_STORY: "SHORT_STORY",
        ACADECIM: "ACADECIM",
        OTHERS: "OTHERS",
      }) as [string, ...string[]]
    )
    .optional(),
  language: z
    .enum(
      Object.values({
        en: "en",
        bn: "bn",
        unknown: "unknown",
      }) as [string, ...string[]]
    )
    .optional(),
  status: z
    .enum(
      Object.values({ ONGOING: "ONGOING", COMPLETE: "COMPLETE" }) as [
        string,
        ...string[]
      ]
    )
    .optional(),
});

type BookFormValues = z.infer<typeof bookSchema>;

export const AddBookModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<IImageUpload>(null);

  const [create, { isLoading: createLoading }] = useCerateABookMutation();

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      bookType: "OTHERS",
      language: "en",
      status: "COMPLETE",
      content: [{ chapter: "", story: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "content",
  });

  const onSubmit = async (values: BookFormValues) => {
    const toastId = toast.loading("Please wait...");

    const formData = new FormData();

    formData.append("data", JSON.stringify(values));

    if (image) {
      formData.append("file", image as File);
    }

    try {
      await create(formData).unwrap();
      //   console.log(result);
      toast.success("Book added successfully!", { id: toastId });
      setOpen(false);
      form.reset();
    } catch (error) {
      console.log(error as any);
      toast.error("Failed to add book", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-xl px-6 py-2">
          + Add Book
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a New Book</DialogTitle>
          <DialogDescription>
            Fill in the details to create your book.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Image */}
            <SingleImageUpload onChange={setImage} />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Short Description */}
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Enter short description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Book Type */}
            <FormField
              control={form.control}
              name="bookType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select book type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NOVEL">Novel</SelectItem>
                      <SelectItem value="POEM">Poem</SelectItem>
                      <SelectItem value="SHORT_STORY">Short Story</SelectItem>
                      <SelectItem value="ACADECIM">Academic</SelectItem>
                      <SelectItem value="OTHERS">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Language */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="bn">Bengali</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ONGOING">Ongoing</SelectItem>
                      <SelectItem value="COMPLETE">Complete</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content (Dynamic Chapters) */}
            <div className="space-y-4">
              <FormLabel>Chapters</FormLabel>
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 space-y-3 relative"
                >
                  {/* Chapter Title */}
                  <FormField
                    control={form.control}
                    name={`content.${index}.chapter`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chapter {index + 1}</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter chapter title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Story */}
                  <FormField
                    control={form.control}
                    name={`content.${index}.story`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Story</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Write the story..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remove Chapter */}
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-0 right-0"
                      onClick={() => remove(index)}
                    >
                      <Minus className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  )}
                </div>
              ))}

              {/* Add Chapter Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => append({ chapter: "", story: "" })}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Chapter
              </Button>
            </div>

            {/* Submit */}
            <motion.div whileTap={{ scale: 0.97 }} className="flex justify-end">
              <Button type="submit" disabled={createLoading}>
                Submit Book
              </Button>
            </motion.div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
