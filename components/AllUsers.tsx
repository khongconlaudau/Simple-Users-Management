import { UserType } from "@/app/util/UserType";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UsersResponse {
  data: UserType[];
}

async function getUsers(): Promise<UsersResponse> {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

export default async function AllUsers(): Promise<JSX.Element> {
  const { data }: UsersResponse = await getUsers();

  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Id</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>User Age</TableHead>
            <TableHead>User Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((u: UserType) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.age}</TableCell>
              <TableCell>{u.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
