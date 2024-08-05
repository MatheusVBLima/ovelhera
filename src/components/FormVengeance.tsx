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
import { updateEnemyStatus, getEnemyById } from "../actions/actions";
import { addLogVengeance } from "../actions/logsActions";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  id: z.string().min(1, "O campo é obrigatório"),
});

export function FormVengeance() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  });

  async function handleVengeance(values: z.infer<typeof formSchema>) {
    try {
      const enemy = await getEnemyById(parseInt(values.id, 10));
      if (!enemy) {
        toast({
          title: "Erro",
          description: `Inimigo de ID ${values.id} não encontrado!`,
        });
        form.reset();
        return;
      }
      await updateEnemyStatus({ id: parseInt(values.id, 10) });

      await addLogVengeance({
        name: session?.user?.name ?? "Usuário Deslogado",
        action: "Vingou um inimigo",
        enemy: enemy.name,
        date: new Date().toLocaleString("pt-BR"),
      });
      toast({
        title: "Sucesso",
        description: `${enemy.name} foi vingado com sucesso!`,
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Erro",
        description: `O canalha de ID ${values.id} já foi vingado`,
      });
      form.reset();
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="mt-16 text-center font-mono text-2xl font-bold">
        Formulário para adicionar vinganças
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleVengeance)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ID do canalha que deseja marcar como vingado
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex. 10..." {...field} />
                </FormControl>
                <FormDescription>O id do sujeito ruim</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="outline"
            className="flex items-center gap-2 border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
          >
            Vingar
            <Skull size={18} />
          </Button>
        </form>
      </Form>
    </div>
  );
}
