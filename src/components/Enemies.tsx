"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { getEnemyList } from "../actions/actions";

type EnemyList = {
  id: number;
  name: string;
  status: string;
};

export function Enemies() {
  const [vingados, setVingados] = useState(0);
  const [enemyList, setEnemyList] = useState<EnemyList[]>([]);

  useEffect(() => {
    async function fetchEnemies() {
      const enemies = await getEnemyList();
      setEnemyList(enemies);
      const totalVingados = enemies.filter(
        (enemy) => enemy.status === "vingado",
      ).length;
      setVingados(totalVingados);
    }

    fetchEnemies();
  }, []);

  return (
    <div className="container mt-10 space-y-12">
      <h1 className="text-center font-mono text-2xl font-bold">
        EU VOU ME VINGAR DE TODOS QUE RIRAM DE MIM
      </h1>
      <div className="flex flex-col items-center justify-center">
        <Table className="w-[400px] xl:w-[500px]">
          <TableCaption>Acompanhamento das vinganças</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">ID</TableHead>
              <TableHead className="text-left">Nome</TableHead>
              <TableHead className="text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enemyList.map((enemy) => (
              <TableRow key={enemy.id}>
                <TableCell className="text-left" colSpan={1}>
                  {enemy.id}
                </TableCell>
                <TableCell className="w-1/2 text-left" colSpan={1}>
                  {enemy.name}
                </TableCell>
                <TableCell
                  className="justify-left flex items-center gap-2"
                  colSpan={1}
                >
                  {enemy.status === "vingado" ? (
                    <Checkbox checked />
                  ) : (
                    <Checkbox disabled />
                  )}
                  {enemy.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="text-left" colSpan={2}>
                Vinganças totais
              </TableCell>
              <TableCell className="text-left" colSpan={2}>
                {vingados}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
