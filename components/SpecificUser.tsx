"use client";

import { UserType } from "@/app/util/UserType";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SpecificUser: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [userData, setUserData] = useState<UserType | null>(null);

  const fetchData = async (): Promise<void> => {
    const res = await fetch(`http://localhost:3000/api/users/${userId}`);

    if (res.ok) {
      const data = await res.json();
      setUserData(data.user);
    } else {
      console.log("Not Found");

      alert("Error fetching data");
      setUserData(null);
      return;
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="w-72">
          <Input
            placeholder="Enter User Id"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button onClick={fetchData} className="bg-gray-400 mt-2">
            Fetch User
          </Button>
        </div>
        {userData && (
          <HoverCard>
            <HoverCardTrigger>Hover</HoverCardTrigger>
            <HoverCardContent>
              Id: {userData.id}, Name: {userData.name}, Age: {userData.age},
              Email: {userData.email}
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
    </div>
  );
};
export default SpecificUser;
