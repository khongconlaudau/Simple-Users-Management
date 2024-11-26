"use client";

import React from "react";
import { useRouter } from "next/navigation";
const page: React.FC = () => {
  const router = useRouter();
  const navigate = (page: string): void => {
    router.push(page);
  };
  return (
    <section>
      <h1 className="text-center">useRouter</h1>
      <button type="button" onClick={() => navigate("/about")}>
        About
      </button>{" "}
      <br />
      <button type="button" onClick={() => navigate("/project")}>
        Project
      </button>
    </section>
  );
};

export default page;
