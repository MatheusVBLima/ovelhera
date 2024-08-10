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
import { FileVideo } from "lucide-react";
import { useSession } from "next-auth/react";
import { updateVideo } from "../../actions/videosActions";
import { addVideoLog } from "../../actions/logsActions";

const formSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(2, "O título do vídeo deve conter pelo menos 2 caracteres")
    .max(80),
  url: z.string().url("O link deve ser uma URL"),
  tag: z
    .string()
    .min(1, "O campo não pode ficar vazio")
    .transform((val) => {
      const tags = val.split(",").map((tag) => tag.trim());
      if (tags.length === 0) {
        throw new Error("Pelo menos uma tag deve ser fornecida");
      }
      return tags;
    }),
});

export function FormEditVideo() {
  const { data: session } = useSession();
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
    const logData = {
      name: session?.user?.name ?? "",
      action: "Editou um vídeo",
      url: values.url,
      date: new Date().toLocaleDateString("pt-BR"),
    };

    const id = values.id;

    const videoData = {
      title: values.title,
      url: values.url,
      tags: values.tag.map((tag) => ({ name: tag })),
    };

    try {
      await updateVideo(id, videoData);
      form.reset();
      await addVideoLog(logData);
      toast({
        description: "Vídeo " + values.title + " editado com sucesso.",
        className: "bg-green-800",
      });
    } catch (error) {
      form.reset();
      toast({
        description: "Houve um erro ao editar o vídeo.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="mt-16 text-center font-mono text-2xl font-bold">
        Formulário para editar histórias
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Id do vídeo a ser editado</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. 10" {...field} />
                </FormControl>
                <FormDescription>
                  Veja o id do vídeo na página de histórias
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
