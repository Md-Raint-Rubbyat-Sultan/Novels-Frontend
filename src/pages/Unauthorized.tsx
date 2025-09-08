import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="grid place-content-center h-screen">
      <div>
        <h1 className="text-3xl">You are unauthorized to visit this page.</h1>
        <div>
          <Link to={"/"}>
            <Button variant={"link"} className="text-2xl cursor-pointer">
              &larr; Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
