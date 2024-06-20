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

const pessoas_ruins = [
  { nome: "SURSKITY", status: "vingado" },
  { nome: "AYEL", status: "vingado" },
  { nome: "PRIMA CAIPIRA", status: "vingado" },
  { nome: "LOIRA182", status: "vingado" },
  { nome: "CESTARI", status: "vingado" },
  { nome: "NAN4", status: "pending" },
  { nome: "SOFEL", status: "pending" },
  { nome: "JACOM3", status: "pending" },
  { nome: "VEGGÆNO", status: "pending" },
  { nome: "PHASI*OT", status: "pending" },
  { nome: "CAIODANCARINO", status: "pending" },
  { nome: "SHADiii", status: "pending" },
  { nome: "TIRANO", status: "pending" },
  { nome: "NAK00", status: "pending" },
  { nome: "YASyMIMCAT", status: "pending" },
  { nome: "MELIsS3X", status: "pending" },
  { nome: "CACHORRO DO GRAGOLANDIA", status: "pending" },
  { nome: "S4ORY", status: "pending" },
  { nome: "MIOJO CAIPIRA", status: "pending" },
  { nome: "DURODO ", status: "pending" },
  { nome: "JUNIN", status: "pending" },
  { nome: "SON3KINHA", status: "pending" },
  { nome: "XY", status: "pending" },
];

export default function page() {
  return (
    <div className="container space-y-12 mt-10">
      <h1 className="text-2xl font-bold font-mono text-center">
        EU VOU ME VINGAR DE TODOS QUE RIRAM DE MIM
      </h1>
      <div className="flex flex-col items-center justify-center ">
        <Table className="w-[400px] xl:w-[700px]">
          <TableCaption>Acompanhamento das vinganças</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pessoas_ruins.map((pessoa) => (
              <TableRow key={pessoa.nome}>
                <TableCell className="text-center w-1/2">
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
