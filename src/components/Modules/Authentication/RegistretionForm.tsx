import register_img from "@/assets/images/login-logo.jpg";
import AvatarUpload from "@/components/Layouts/Shared/AvaterUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { config } from "@/configs";
import { cn } from "@/lib/utils";
import { useRegisterUserMutation } from "@/redux/features/auth/auth.api";
import type { IImageUpload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import PasswordField from "./PasswordField";

const registerSchema = z
  .object({
    name: z.string().min(2, { error: "Name too short." }).max(50),
    email: z.email(),
    password: z.string().min(6, { error: "Password too short." }),
    confirmPassword: z.string().min(6, { error: "confirmPassword too short." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Password doesn't match.",
  });

export const RegistretionForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [register, isLoding] = useRegisterUserMutation();

  // Navigation
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const redirect = search.get("redirect") || "/";

  const [picture, SetPicture] = useState<IImageUpload>(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const toastId = toast.loading("Please wait...");

    const formData = new FormData();

    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    formData.append("data", JSON.stringify(userInfo));

    if (picture) {
      formData.append("file", picture as File);
    }

    try {
      const result = await register(formData).unwrap();
      toast.success(result.message, { id: toastId });
      navigate("/login", {
        state: { email: data.email },
      });
    } catch (error) {
      toast.error(
        ((error as Record<string, string | number>).data as any)?.message,
        { id: toastId }
      );
      form.reset();
      SetPicture(null);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              {/* introductions div */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Registration</h1>
                <p className="text-muted-foreground text-balance">
                  Register for a new{" "}
                  <span className="italic font-medium text-primary">
                    Novels
                  </span>{" "}
                  account
                </p>
              </div>
              {/* form */}
              <div>
                <AvatarUpload onChange={SetPicture} />
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="User name" {...field} />
                          </FormControl>
                          <FormDescription className="sr-only">
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="example@xyz.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="sr-only">
                            This is your email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <PasswordField {...field} />
                          </FormControl>
                          <FormDescription className="sr-only">
                            This is your password.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <PasswordField {...field} />
                          </FormControl>
                          <FormDescription className="sr-only">
                            This is your confirm password.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="cursor-pointer w-full"
                      disabled={!isLoding}
                    >
                      Register
                    </Button>
                  </form>
                </Form>
              </div>
              {/* Split div */}
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              {/* Socila auth buttons */}
              <div className="flex items-center flex-wrap gap-4">
                {/* google */}
                <Button
                  onClick={() =>
                    (window.location.href = `${config.baseUrl}/auth/google?redirect=${redirect}`)
                  }
                  variant="outline"
                  type="button"
                  className="w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Google</span>
                  <span className="sr-only">Login with Google</span>
                </Button>
              </div>
              {/* move to kogin */}
              <div className="text-center text-sm *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4">
                Don&apos;t have an account?
                <Link
                  to={`/login?redirect=${encodeURIComponent(redirect)}`}
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
          {/* image div */}
          <div className="bg-muted relative hidden md:block">
            <img
              src={register_img}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
            />
          </div>
        </CardContent>
      </Card>
      {/* back to home */}
      <div className="flex justify-center items-center gap-1 text-muted-foreground *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4">
        <span>Back to</span>
        <Link to={"/"} className="flex items-center w-fit gap-1">
          <Home size={"16px"} /> <span>Home</span>
        </Link>
        .
      </div>
    </div>
  );
};
