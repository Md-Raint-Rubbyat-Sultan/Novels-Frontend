import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Logo from "@/assets/icons/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { auhtApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { useAppDispatch } from "@/redux/hooks";
import { ChevronDown } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "public" },
  { href: "/about", label: "About", role: "public" },
  { href: "/books", label: "Books", role: "public" },
  { href: "/pricing", label: "Pricing", role: "public" },
];

const Navbar = () => {
  const { data: user } = useGetMeQuery(undefined);
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const toastId = toast.loading("Loged In...");
    try {
      const result = await logout(undefined).unwrap();
      if (result.success) {
        toast.success(result.message, { id: toastId });
        dispatch(auhtApi.util.resetApiState());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error((error as any).data?.message, { id: toastId });
    }
  };

  return (
    <header className="bg-background shadow px-4 md:px-6 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        asChild
                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        active={location.pathname === link.href}
                      >
                        <NavLink to={link.href}>{link.label}</NavLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link
              to={"/"}
              // className="text-primary hover:text-primary/90"
            >
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      active={location.pathname === link.href}
                    >
                      <NavLink to={link.href}>{link.label}</NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                {user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="flex items-center gap-1 cursor-pointer  hover:shadow-2xl hover:shadow-accent">
                        <Avatar>
                          <AvatarImage src={user.data.picture} />
                          <AvatarFallback className="bg-primary dark:text-foreground text-accent border-2">
                            {user.data.name[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        <div className="grid grid-cols-1 gap-2 place-items-center">
                          <Avatar>
                            <AvatarImage src={user.data.picture} />
                            <AvatarFallback className="bg-primary dark:text-foreground text-accent border-2">
                              {user.data.name[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-center">
                            <h2 className="text-xl font-medium">
                              {user.data.name}
                            </h2>
                            <p className="text-muted-foreground">
                              {user.data.email}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Button
                        variant={"default"}
                        size={"sm"}
                        className="w-full my-2"
                        asChild
                      >
                        <Link to={"/user/profile"}>Profile</Link>
                      </Button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="block md:hidden">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-1 cursor-pointer  hover:shadow-2xl hover:shadow-accent">
                    <Avatar>
                      <AvatarImage src={user.data.picture} />
                      <AvatarFallback className="bg-primary dark:text-foreground text-accent border-2">
                        {user.data.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div className="grid grid-cols-1 gap-2 place-items-center">
                      <Avatar>
                        <AvatarImage src={user.data.picture} />
                        <AvatarFallback className="bg-primary dark:text-foreground text-accent border-2">
                          {user.data.name[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <h2 className="text-xl font-medium">
                          {user.data.name}
                        </h2>
                        <p className="text-muted-foreground">
                          {user.data.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Button
                    variant={"default"}
                    size={"sm"}
                    className="w-full my-2"
                    asChild
                  >
                    <Link to={"/user/profile"}>Profile</Link>
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <Button asChild className="text-sm">
            <ModeToggle />
          </Button>
          {!user && (
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
          {user?.data?.email && (
            <Button
              variant={"outline"}
              type="button"
              className="text-sm"
              onClick={handleLogout}
              disabled={logoutLoading}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
