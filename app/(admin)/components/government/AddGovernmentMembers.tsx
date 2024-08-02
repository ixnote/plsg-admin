"use client";
import React, { useState } from "react";
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
import Loader from "../Loader";
import { useCreateGovernmentMutation } from "@/redux/services/government/government-api";
import { showToast } from "@/lib/showToast";

const AddGovernmentMembers = ({
  onGovernmentCreated,
}: {
  onGovernmentCreated: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const [createGovernment, { isLoading }] = useCreateGovernmentMutation();

  const handleSubmit = async () => {
    try {
      const newGovernment = {
        name,
        role,
      };

      await createGovernment(newGovernment).unwrap();
      showToast("success", <p>Government official added successfully</p>);

      setName("");
      setRole("");

      setOpen(false);

      onGovernmentCreated();
    } catch (error) {
      console.error("Failed to create government member:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-fit" onClick={() => setOpen(true)}>
          Add Governments
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Governments</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col space-y-2">
          <Input
            placeholder="Full Name"
            className="w-full"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Role"
            className="w-full"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? <Loader /> : "Create Government"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGovernmentMembers;
