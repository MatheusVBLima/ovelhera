"use client";
import {
  Table,
  TableBody,
  TableCell, TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { getVengeanceLogs } from "../../actions/logsActions";
import { Badge } from "../ui/badge";
import {
  Pagination,
  PaginationContent
} from "../ui/pagination";

type EnemyLogs = {
  name: string;
  action: string;
  enemy: string;
  date: string;
};

export function EnemiesLogs() {
  const [logs, setLogs] = useState<EnemyLogs[]>([]);

  useEffect(() => {
    async function fetchEnemies() {
      const logs = await getVengeanceLogs();
      setLogs(logs);
    }

    fetchEnemies();
  }, []);

  return (
    <>
      <h1 className="mt-16 text-center font-mono text-2xl font-bold">
        Tabela com as ações realizadas pelos admins
      </h1>
      <Pagination>
        <PaginationContent>
          <Table className="mt-10 lg:w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="w-[200px]">Ação</TableHead>
                <TableHead>Inimigo</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.toReversed().map((log, index) => (
                <TableRow key={index}>
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

                  <TableCell>{log.enemy}</TableCell>
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
