import { type ReactNode } from "react";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

interface IProps {
  children: ReactNode;
}

export const CommonLayout = ({ children }: IProps) => {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 grow-1">{children}</div>
      <Footer />
    </main>
  );
};
