import React from "react";

type Props = {};

const Logo: React.FC<Props> = () => {
  return (
    <div className="flex items-center">
      <img src="https://img.icons8.com/nolan/64/n-key.png" alt="logo" />
      <h3 className="text-5xl text-primary font-semibold hidden sm:block">
        Novels
      </h3>
    </div>
  );
};

export default Logo;
