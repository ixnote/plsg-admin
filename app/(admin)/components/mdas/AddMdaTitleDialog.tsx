"use client";
import React, { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/showToast";
import Loader from "../Loader";

import { useCreateMdaMutation } from "@/redux/services/mdas/mdas-api";

const AddMdaTitleDialog = ({ title = "Create MDA" }: { title?: string }) => {
  const { push } = useRouter();
  const [inputValue, setInputValue] = useState<string>("New MDA Caption");

  const [createMda, { data, isError, isLoading, isSuccess }] =
    useCreateMdaMutation();

  const handleSubmit = async () => {
    try {
      console.log("🚀 ~ AddMdaTitleDialog ~ inputValue:", inputValue);

      const result = await createMda({ name: inputValue }).unwrap();
      console.log(result);
      showToast("success", <p>{result?.message}</p>);
      push(`/mdas/${result?.data?.id || "1"}`);
    } catch (error: any) {
      showToast("error", <p>{error.data.message}</p>);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-fit">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>MDA caption</DialogTitle>
        </DialogHeader>
        <div className="flex w-full">
          <Input
            placeholder="MDA Caption"
            className="w-full"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toString() as string)}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={inputValue === "" || inputValue.length < 4}
            onClick={handleSubmit}
          >
            {isLoading ? <Loader /> : "Create MDA"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMdaTitleDialog;
