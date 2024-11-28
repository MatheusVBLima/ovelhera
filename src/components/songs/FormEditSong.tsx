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
import { Music } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addSongLog } from "../../actions/logsActions";
import { updateSong } from "../../actions/songsActions";

const formSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(2, "O título da música deve conter pelo menos 2 caracteres")
    .max(80),
  url: z.string().url("O link deve ser uma URL"),

});

export function FormEditSong() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      title: "",
      url: "",
      
    },
  });

  async function handleOnSubmit(values: z.infer<typeof formSchema>) {
    const logData = {
      name: session?.user?.name ?? "",
      action: "Editou uma música",
      url: values.url,
      date: new Date().toLocaleString("pt-BR"),
    };

    const id = values.id;

    const songData = {
      title: values.title,
      url: values.url,
    };

    try {
      await updateSong(id, songData);
      form.reset();
      await addSongLog(logData);
      toast({
        description: "Música " + values.title + " editada com sucesso.",
        className: "bg-green-800",
      });
    } catch (error) {
      form.reset();
      toast({
        description: "Houve um erro ao editar a música.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="mt-16 text-center font-mono text-2xl font-bold">
        Formulário para editar músicas
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Id da música a ser editada</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. 10" {...field} />
                </FormControl>
                <FormDescription>
                  Veja o id da música na página de músicas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título da música</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. Never Gonna Give You Up" {...field} />
                </FormControl>
                <FormDescription>
                  Nome da música que será exibido no site
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
                <FormLabel>URL da música</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex. https://open.spotify.com/track/..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Link do Spotify para a música
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
            <span>Editar Música</span>
            <Music size={18} />
          </Button>
        </form>
      </Form>
    </div>
  );
}