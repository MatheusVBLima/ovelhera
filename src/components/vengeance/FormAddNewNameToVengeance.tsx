"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Skull } from "lucide-react";
import { addEnemy } from "../../actions/enemiesActions";
import { addVengeanceLog } from "../../actions/logsActions";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(1, "O campo é obrigatório"),
});

export function FormAddNewNameToVengeance() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function handleAddEnemy(values: z.infer<typeof formSchema>) {
    const data = {
      name: values.name,
      status: "pendente",
    };

    try {
      await addEnemy(data);
      await addVengeanceLog({
        name: session?.user?.name ?? "Usuário Deslogado",
        action: "Adicionou um inimigo",
        enemy: values.name,
        date: new Date().toLocaleString("pt-BR"),
      });
      toast({
        title: "Sucesso!",
        description: `${values.name} adicionado com sucesso!`,
      });

      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ",
        description: "ID não encontrado.",
      });
      form.reset();
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="mt-16 text-center font-mono text-2xl font-bold">
        Formulário para adicionar pessoa na lista negra
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAddEnemy)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do canalha que voce quer se vingar</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. GD..." {...field} />
                </FormControl>
                <FormDescription>O nome do sujeito ruim</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="outline"
            className="flex items-center gap-2 border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
          >
            Adicionar
            <Skull size={18} />
          </Button>
        </form>
      </Form>
    </div>
  );
}
