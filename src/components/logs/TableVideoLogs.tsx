"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { getVideoLogs } from "../../actions/logsActions";
import { useEffect, useState } from "react";

type VideoLogs = {
  name: string;
  action: string;
  url: string | null;
  date: string;
};

export function FormLogs() {
  const [logs, setLogs] = useState<VideoLogs[]>([]);

  useEffect(() => {
    async function fetchLogs() {
      const videoLogs = await getVideoLogs();
      setLogs(videoLogs);
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
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{log.name}</TableCell>
                  {log.action === "Deletou um vídeo" ? (
                    <TableCell>
                      <Badge variant="destructive">{log.action}</Badge>
                    </TableCell>
                  ) : log.action === "Adicionou um vídeo" ? (
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
