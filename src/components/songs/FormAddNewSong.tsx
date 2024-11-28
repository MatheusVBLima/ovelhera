"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { FileVideo } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addSong } from "../../actions/songsActions";
/* import { addSongLog } from "../../actions/logsActions"; */

const formSchema = z.object({
  title: z
    .string()
    .min(2, "O título do vídeo deve conter pelo menos 2 caracteres")
    .max(80),
  url: z.string().url("O link deve ser uma URL"),
});

export function FormAddNewSong() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  async function handleOnSubmit(values: z.infer<typeof formSchema>) {
  /*   const logData = {
      name: session?.user?.name ?? "",
      action: "Adicionou uma música",
      url: values.url,
      date: new Date().toLocaleString("pt-BR"),
    }; */

    const songData = {
      title: values.title,
      url: values.url,
        };

    try {
      await addSong(songData);
      form.reset();
     /*  await addSongLog(logData); */
      toast({
        description: "Música " + values.title + " adicionada com sucesso.",
        className: "bg-green-800",
      });
    } catch (error) {
      form.reset();
      toast({
        description: "Houve um erro ao adicionar a música.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-8">
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
