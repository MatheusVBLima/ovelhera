"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell, TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getVideoLogs } from "../../actions/logsActions";
import { Badge } from "../ui/badge";

type VideoLogs = {
  name: string;
  action: string;
  url: string | null;
  date: string;
};

export function FormLogs() {
  const [logs, setLogs] = useState<VideoLogs[]>([]);
  const ITENS_POR_PAGINA = 10
  const [paginaAtual, setPaginaAtual] = useState(1)
  const totalPaginas = Math.ceil(logs.length / ITENS_POR_PAGINA)
  const indiceInicial = (paginaAtual - 1) * ITENS_POR_PAGINA
  const logsPaginados = logs.slice(
      indiceInicial,
      indiceInicial + ITENS_POR_PAGINA
  )


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
    
          <Table className="mt-10">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logsPaginados.toReversed().map((log, index) => (
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
          <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))}
              className={
                paginaAtual === 1
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPaginas }).map((_, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                onClick={() => setPaginaAtual(index + 1)}
                isActive={paginaAtual === index + 1}
                className="cursor-pointer"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))
              }
              className={
                paginaAtual === totalPaginas
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
