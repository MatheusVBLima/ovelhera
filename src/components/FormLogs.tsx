import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import data from "@/../data.json";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default function FormLogs() {
  return (
    <>
      <h1 className="mt-16 text-center font-mono text-2xl font-bold">
        Tabela com as ações realizadas pelos admins
      </h1>
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Ação</TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="text-right">Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{log.name}</TableCell>
              {log.action === "Deletou um vídeo" ? (
                <TableCell>
                  <Badge variant="destructive">{log.action}</Badge>
                </TableCell>
              ) : (
                <TableCell>
                  <Badge variant={"outline"} className="bg-green-800">
                    {log.action}
                  </Badge>
                </TableCell>
              )}

              <TableCell>
                <Link href={log.url} target="_blank">
                  {log.url}
                </Link>
              </TableCell>
              <TableCell className="text-right">{log.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </>
  );
}
