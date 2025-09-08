import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PasswordField from "../../Authentication/PasswordField";

type Props = {};

const updateFormSchema = z.object({
  oldPassword: z
    .string()
    .min(6, { error: "Password should contain minimum 6 characters" })
    .max(32, { error: "Password should not larger than 32 character" }),
  newPassword: z
    .string()
    .min(6, { error: "Password should contain minimum 6 characters" })
    .max(32, { error: "Password should not larger than 32 character" }),
});

const ChangePasswordModal: React.FC<Props> = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof updateFormSchema>) => {
    const toastId = toast.loading("Online status is chnagning...");
    try {
      const result = await changePassword(data).unwrap();
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
          <Eye /> Change Password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Change your Password</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <PasswordField {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This will be displayed on your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordField {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This will be displayed on your profile.
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

export default ChangePasswordModal;
