import { UserType } from "@/app/util/UserType";
import { users } from "@/app/util/db";
import { ok } from "assert";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
// fetch specified user
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const id: string | undefined = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is missing " },
        { status: 400 }
      );
    }
    const user: UserType | undefined = users.find((u) => u.id === id);
    if (user) {
      return NextResponse.json({ user, ok: true });
    } else {
      return NextResponse.json(
        {
          error: `No user found with ID: ${id}`,
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// login
type UserData = {
  name: string;
  email: string;
  password: string;
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { name, email, password }: UserData = await req.json();
    const id: string | undefined = req.nextUrl.pathname.split("/").pop();

    const user = users.find((u) => u.id === id);

    if (user) {
      const {
        name: uName,
        email: uEmail,
        password: uPassword,
      }: UserType = user;
      // Use uName, uEmail, uPassword here
      if (uName === name && uEmail === email && uPassword == password) {
        return NextResponse.json(
          { res: "Successfully logged in" },
          { status: 200 }
        );
      }
    }
    return NextResponse.json(
      { res: "Please fill out all the input fields" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json({ res: "Invalid Credentials" }, { status: 404 });
  }
};

// update existing user
export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  const getID: string | undefined = req.nextUrl.pathname.split("/").pop();
  const { id, name, age, email, password }: UserType = await req.json();
  const userIndex: number = users.findIndex((u) => u.id === getID);
  console.log(userIndex);

  if (userIndex == -1) {
    return NextResponse.json({ res: "User not found" }, { status: 404 });
  }

  if (name) users[userIndex].name = name;
  if (age) users[userIndex].age = age;
  if (email) users[userIndex].email = email;
  if (password) users[userIndex].password = password;

  const updatedData = JSON.stringify(users, null, 2);

  // write to the file
  fs.writeFileSync(
    "./app/util/db.tsx",
    `export const users = ${updatedData}`,
    "utf-8"
  );

  return NextResponse.json(
    { res: "Successfully to update the user", ok: true },
    {
      status: 200,
    }
  );
};

// delete user
export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  const id: string | undefined = req.nextUrl.pathname.split("/").pop();
  console.log(id);

  const userIndex: number = users.findIndex((u) => u.id === id);
  if (userIndex === -1)
    return NextResponse.json(
      { res: "The user does not exist" },
      { status: 404 }
    );

  users.splice(userIndex, 1);

  const updatedData = JSON.stringify(users, null, 2);

  fs.writeFileSync(
    "./app/util/db.tsx",
    `export const users = ${updatedData}`,
    "utf-8"
  );
  return NextResponse.json(
    { res: "Successfully to delete the user" },
    {
      status: 200,
    }
  );
};
