import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { IImageUpload, IUser } from "@/types";
import { toast } from "sonner";
import { useUpdateUserMutation } from "@/redux/features/user/user.api";
import { Upload } from "lucide-react";
import AvatarUpload from "@/components/Layouts/Shared/AvaterUpload";

type Props = {
  user: IUser;
};

const updateFormSchema = z.object({
  name: z.string().min(3, { error: "Name too Short!" }),
  phone: z
    .string()
    .regex(/^(?:\+8801\d{9})|01\d{9}$/, {
      error: "Invalied phone number. Formet: +8801xxxxxxxxx or 01xxxxxxxxx",
    })
    .optional(),
  address: z.string().optional(),
});

const UpdateModal: React.FC<Props> = ({ user }) => {
  const [updateUserStatus, { isLoading }] = useUpdateUserMutation();

  const [picture, SetPicture] = useState<IImageUpload>(null);

  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
      address: user?.address || "N/A",
    },
  });

  const onSubmit = async (data: z.infer<typeof updateFormSchema>) => {
    const toastId = toast.loading("User Updating...");

    const formData = new FormData();

    const updatedDoc = {
      name: data.name,
      phone: data.phone,
      address: data.address,
    };

    formData.append("data", JSON.stringify(updatedDoc));

    if (picture) {
      formData.append("file", picture as File);
    }

    try {
      const result = await updateUserStatus({
        _id: user._id,
        formData,
      }).unwrap();
      if (result.success) {
        toast.success(result.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error((error as any).data?.message, { id: toastId });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto" variant={"outline"}>
          <Upload /> Update Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Update your name and phone number.
          </DialogDescription>
        </DialogHeader>

        <AvatarUpload onChange={SetPicture} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This will be displayed on your profile name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Your Phone number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Address" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Your Address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
