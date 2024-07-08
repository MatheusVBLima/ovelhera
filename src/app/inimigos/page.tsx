"use client";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useSession } from "next-auth/react";
import data from "@/../data.json";

export default function page() {
  const { data: session } = useSession();
  return (
    <div className="container mt-10 space-y-12">
      <h1 className="text-center font-mono text-2xl font-bold">
        EU VOU ME VINGAR DE TODOS QUE RIRAM DE MIM
      </h1>
      <div className="flex flex-col items-center justify-center">
        <Table className="w-[400px] xl:w-[700px]">
          <TableCaption>Acompanhamento das vinganças</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.pessoas_ruins.map((pessoa) => (
              <TableRow key={pessoa.nome}>
                <TableCell className="w-1/2 text-center">
                  {pessoa.nome}
                </TableCell>
                <TableCell className="flex items-center justify-center gap-2">
                  {pessoa.status === "vingado" ? (
                    <Checkbox checked />
                  ) : (
                    <Checkbox />
                  )}
                  {pessoa.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="text-center">Vinganças totais</TableCell>
              <TableCell className="text-center">5</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
