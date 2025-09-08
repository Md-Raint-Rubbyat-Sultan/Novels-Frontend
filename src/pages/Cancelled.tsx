import { Home } from "lucide-react";
import React from "react";
import { Link } from "react-router";

type Props = {};

const Cancelled: React.FC<Props> = () => {
  return (
    <div className="text-2xl text-center p-6">
      <h1>Payment Cancelled</h1>
      <h1>Back to Home</h1>
      <p className="flex justify-center items-center gap-2 underline underline-offset-2 text-primary">
        <Home size={"32px"} />
        <Link to={"/"}>Home</Link>
      </p>
    </div>
  );
};

export default Cancelled;
