"use client";
import { UserType } from "@/app/util/UserType";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

type UpdateDataType = {
  id: string;
  name?: string;
  age?: string;
  email?: string;
  password?: string;
};
const UpdateUser = (): JSX.Element => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!id) {
      alert("ID cannot be empty");
      return;
    }

    const requestedData: UpdateDataType = {
      id,
    };

    if (name) {
      requestedData.name = name;
    }
    if (age) {
      requestedData.age = age;
    }
    if (email) {
      requestedData.email = email;
    }
    if (name) {
      requestedData.password = password;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestedData),
      });
      if (res.ok) {
        alert("The user is updated successfully");
        return;
      } else {
        alert("Something Went Wrong");
        return;
      }
    } catch (error) {
      alert(error);
      return;
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="mt-2" type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};
export default UpdateUser;
