"use client";
import {
    Table,
    TableBody,
    TableCell, TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSongLogs } from "../../actions/logsActions";
import { Badge } from "../ui/badge";
import {
    Pagination,
    PaginationContent
} from "../ui/pagination";

type SongLogs = {
  name: string;
  action: string;
  url: string | null;
  date: string;
};

export function TableSongsLogs() {
  const [logs, setLogs] = useState<SongLogs[]>([]);

  useEffect(() => {
    async function fetchLogs() {
      const songLogs = await getSongLogs();
      setLogs(songLogs);
    }

    fetchLogs();
  }, []);

  return (
    <>
      <h1 className="mt-16 text-center font-mono text-2xl font-bold">
        Tabela com as ações realizadas pelos admins
      </h1>
      <Pagination>
        <PaginationContent>
          <Table className="mt-10 lg:w-[900px]">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.toReversed().map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{log.name}</TableCell>
                  {log.action === "Deletou uma música" ? (
                    <TableCell>
                      <Badge variant="destructive">{log.action}</Badge>
                    </TableCell>
                  ) : log.action === "Adicionou uma música" ? (
                    <TableCell>
                      <Badge variant={"outline"} className="bg-green-800">
                        {log.action}
                      </Badge>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <Badge variant={"outline"} className="bg-yellow-600">
                        {log.action}
                      </Badge>
                    </TableCell>
                  )}
                  <TableCell>
                    {log.url && (
                      <Link href={log.url} target="_blank">
                        {log.url}
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>{log.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PaginationContent>
      </Pagination>
    </>
  );
}
