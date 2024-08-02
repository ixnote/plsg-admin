"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const UpdateGovernment = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="flex flex-col  gap-10 h-full p-10">
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <div
            className="flex gap-3 items-center cursor-pointer"
            onClick={handleGoBack}
          >
            <ArrowLeftIcon />
            <h1 className="text-2xl font-geistsans font-semibold">
              Update Government
            </h1>
          </div>
        </div>

        <div className="flex flex-col w-full gap-6">
          <div className="flex  w-full gap-x-4">
            <div className="w-full">
              <Input placeholder="Enter MDAS Official Name" />
            </div>
            <div className="w-full">
              <Input placeholder="Enter MDAS abbreviation" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateGovernment;
