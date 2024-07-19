import React from "react";

type Sections = {
  title: string;
};

const Section = ({ title, children }: any) => {
  return (
    <>
      <div className="flex flex-col gap-2 items-start w-full">
        <div className="w-full font-geistmono font-bold text-lg">{title}</div>
        <div className="w-full rounded-md h-screen py-2">{children}</div>
      </div>
    </>
  );
};

export default Section;
