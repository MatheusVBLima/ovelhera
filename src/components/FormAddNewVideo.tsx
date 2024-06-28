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
import { FileVideo } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  url: z.string().url(),
  tag: z
    .string()
    .min(1)
    .transform((val) => val.split(",").map((tag) => tag.trim())),
});

export default function FormAddNewVideo() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      tag: [],
    },
  });

  async function handleOnSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.post("/", values);
      form.reset();
      toast({
        description: "Vídeo " + values.title + " adicionado com sucesso.",
        variant: "default",
      });
    } catch (error) {
      form.reset();
      toast({
        description: "Houve um erro ao adicionar o video.",
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <h1 className="mt-16 text-center font-mono text-2xl font-bold">
        Formulário para enviar histórias
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título do vídeo</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. Ovelha leva gank..." {...field} />
                </FormControl>
                <FormDescription>
                  Vai ser o nome do vídeo que todos irão ver no site
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL do vídeo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex. https://www.youtube.com/watch?..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Basta copiar e colar o link do vídeo que você deseja adicionar
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex. nojeira, gank, modoM... "
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Pode ser mais de 1 tag, desde que separadas por vírgula. Elas
                  serão usadas para filtrar vídeos
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"outline"}
            className="flex items-center gap-2 border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
          >
            <span>Adicionar Vídeo</span>
            <FileVideo size={18} />
          </Button>
        </form>
      </Form>
    </div>
  );
}
