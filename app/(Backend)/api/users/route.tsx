import { NextResponse, NextRequest } from "next/server";
import { users } from "@/app/util/db";
import { UserType } from "@/app/util/UserType";
import fs from "fs";

// fetch all users
export const GET = async (): Promise<NextResponse> => {
  try {
    const data: UserType[] = users;
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};

// create new user
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { id, name, age, email, password }: UserType = await req.json();

  if (!id || !name || !email || !password || !age) {
    return NextResponse.json(
      { res: "Please fill out all the fields" },
      { status: 400 }
    );
  } else {
    const existingUser: UserType | undefined = users.find((u) => u.id === id);
    if (existingUser) {
      return NextResponse.json({ res: "The user already existed" });
    }
    // add new user to the in-memory array

    users.push({ id, name, age, email, password });

    // Convert the updated users array to a JSON string
    // already did in the type but for string prettier format
    const updatedData = JSON.stringify(users, null, 2);

    // write the updatedData to the file
    try {
      // Write the updated data to the file
      fs.writeFileSync(
        "./app/util/db.tsx",
        `export const users = ${updatedData}`,
        "utf-8"
      );
    } catch (error) {
      return NextResponse.json(
        { res: "Failed to save user data to file" },
        { status: 500 }
      );
    }
  }
  console.log("We are hereeeeeeeeeeeee222123");

  return NextResponse.json({ res: "The user is saved successfully", ok: true });
};
