import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";
import AllUsers from "./AllUsers";
import SpecificUser from "./SpecificUser";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
const AccordionUI: React.FC = () => {
  return (
    <section className="w-[40rem]">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>All Users</AccordionTrigger>
          <AccordionContent>
            <AllUsers />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Search For Specified User</AccordionTrigger>
          <AccordionContent>
            <SpecificUser />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Create New User</AccordionTrigger>
          <AccordionContent>
            <CreateUser />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Update User</AccordionTrigger>
          <AccordionContent>
            <UpdateUser />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
export default AccordionUI;
