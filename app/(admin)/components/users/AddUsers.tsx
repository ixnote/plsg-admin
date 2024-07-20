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
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/showToast";
import Loader from "../Loader";
import { useCreateUsersMutation } from "@/redux/services/auth/auth-api";

const AddUsers = ({
  title = "Add Users",
  onUserCreated,
}: {
  title?: string;
  onUserCreated: () => void;
}) => {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("mda-admin");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [createUsers, { isLoading }] = useCreateUsersMutation();

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+234\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async () => {
    const validationErrors: { [key: string]: string } = {};

    if (!fullName) validationErrors.fullName = "Full name is required";
    if (!validatePhone(phone))
      validationErrors.phone =
        "Phone number must be in the format '+2349012342345'";
    if (!email) validationErrors.email = "Email is required";
    if (!validatePassword(password))
      validationErrors.password =
        "Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one digit, and one special character";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await createUsers({
        full_name: fullName,
        phone,
        email,
        password,
        role,
      }).unwrap();
      console.log(result);
      showToast("success", <p>{result?.message}</p>);
      setOpen(false); // Close the dialog on success
      onUserCreated(); // Trigger refetch in UsersPage
      // push(`/news/1`);
    } catch (error: any) {
      showToast("error", <p>{error.data.message}</p>);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-fit" onClick={() => setOpen(true)}>
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col space-y-2">
          <Input
            placeholder="Full Name"
            className="w-full"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName}</p>
          )}
          <Input
            placeholder="Phone"
            className="w-full"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone}</p>
          )}
          <Input
            placeholder="Email"
            className="w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
          <Input
            placeholder="Role"
            className="w-full"
            type="text"
            value={role}
            disabled
          />
          <Input
            placeholder="Password"
            className="w-full"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? <Loader /> : "Create User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUsers;
