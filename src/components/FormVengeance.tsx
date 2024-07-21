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
import { api } from "@/server/api";
import { useToast } from "@/components/ui/use-toast";
import { Skull } from "lucide-react";
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
      const response = await api.get(`/pessoas_ruins/${values.id}`);
      const data = response.data;

      if (data.status === "pendente") {
        data.status = "vingado";
        await api.put(`/pessoas_ruins/${data.id}`, data);

        toast({
          title: "Sucesso",
          description: `${data.nome} foi vingado com sucesso!`,
        });
        form.reset();
      } else {
        toast({
          title: "Erro",
          description: `${data.nome} ja foi vingado!`,
        });
        form.reset();
      }
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
    <>
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
                <FormLabel>ID do canalha que deseja vingar</FormLabel>
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
    </>
  );
}
