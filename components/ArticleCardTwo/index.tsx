import React from "react";
import Image from "next/image";

function ArticleCardTwo({ data }: any) {
  return (
    <span className="col-span-1 flex flex-col gap-5 pb-10">
      <Image
        src={data?.image}
        alt=""
        width={1200}
        height={1200}
        className="w-full h-auto rounded-2xl aspect-[5/3] object-cover"
      />
      <p className="text-[24px] leading-[30px] font-normal text-[#00000099] m-0 lg:col-span-4 col-span-1">
        {data?.title}
      </p>
      <p className="text-[18px] font-normal text-[#00000099] m-0 ">
        {data?.text}
      </p>
    </span>
  );
}

export default ArticleCardTwo;
