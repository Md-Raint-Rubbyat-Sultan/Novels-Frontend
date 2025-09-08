import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import PasswordField from "./PasswordField";
import { config } from "@/configs";
import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";
import login_img from "@/assets/images/register-logo.jpg";
import { demoCredintials } from "@/constants/demoCredintials";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(6, { error: "Password too short." }),
});

export const LoginForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [login, isLoading] = useLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: location.state?.email || "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Please wait...");

    try {
      const result = await login(data).unwrap();
      toast.success(result.message, { id: toastId });
      navigate(location.state?.path || "/");
    } catch (error) {
      console.log(error as any);
      toast.error(
        ((error as Record<string, string | number>).data as any)?.message,
        { id: toastId }
      );
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
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your{" "}
                  <span className="italic font-medium text-primary">
                    Novels
                  </span>{" "}
                  account
                </p>
              </div>
              {/* Demo login */}
              <div className="text-xs text-muted-foreground space-y-4">
                <p>Demo User to Quick login</p>
                <div className="flex flex-wrap items-center justify-start gap-2 text-accent font-bold">
                  {demoCredintials.map((demo, idx) => (
                    <span
                      key={idx}
                      className="bg-primary px-2 py-1 rounded-lg cursor-pointer"
                      onClick={() => onSubmit(demo.credintial)}
                    >
                      {demo.role}
                    </span>
                  ))}
                </div>
              </div>
              {/* form */}
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
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
                    <Button
                      type="submit"
                      className="cursor-pointer w-full"
                      disabled={!isLoading}
                    >
                      Login
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
                    (window.location.href = `${
                      config.baseUrl
                    }/auth/google?redirect=${location.state?.path || "/"}`)
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
              {/* move to sign in or register */}
              <div className="text-center text-sm *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4">
                Don&apos;t have an account?{" "}
                <Link
                  to={"/register"}
                  className="underline underline-offset-4"
                  state={{ path: location.state?.path }}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
          {/* image div */}
          <div className="bg-muted relative hidden md:block">
            <img
              src={login_img}
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
