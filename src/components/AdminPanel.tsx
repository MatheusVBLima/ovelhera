"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
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

const formSchema = z.object({
  title: z.string().min(2).max(50),
  url: z.string().url(),
  tag: z
    .string()
    .min(1)
    .transform((val) => val.split(",").map((tag) => tag.trim())),
});

const formDeleteSchema = z.object({
  video_id: z.number().min(1).max(10),
});
export default function AdminPanel() {
  const { data: session } = useSession();
  const image = session?.user?.image || "";
  const [isAddNewVideo, setIsAddNewVideo] = useState(true);

  function handleDeleteVideo() {
    setIsAddNewVideo(false);
    form.reset();
    formDelete.reset();
  }

  function handleAddNewVideo() {
    setIsAddNewVideo(true);
    formDelete.reset();
    form.reset();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      tag: [],
    },
  });

  const formDelete = useForm<z.infer<typeof formDeleteSchema>>({
    resolver: zodResolver(formDeleteSchema),
    defaultValues: {
      video_id: 0,
    },
  });

  async function handleOnSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.post("/", values);
    } catch (error) {}
  }

  async function handleDelete(values: z.infer<typeof formDeleteSchema>) {
    try {
      console.log(values.video_id);
      /* const response = await api.delete(`/${values.video_id}`); */
    } catch (error) {}
  }

  return (
    <div className="container mt-8">
      {session && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={image} alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-xl">Olá, {session.user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={handleAddNewVideo} variant={"outline"}>
                Novo Vídeo
              </Button>
              <Button onClick={handleDeleteVideo} variant={"destructive"}>
                Deletar Vídeo
              </Button>
            </div>
          </div>

          {isAddNewVideo ? (
            <>
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
                          <Input
                            placeholder="Ex. Ovelha leva gank..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Vai ser o nome do vídeo que todos vão ver no site
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
                          A URL completa do vídeo de qualquer canal do youtube
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
                          Pode ser mais de 1 tag, desde que separadas por ",".
                          Elas serão usadas para filtrar vídeos
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant={"outline"}>
                    Submit
                  </Button>
                </form>
              </Form>
            </>
          ) : (
            <>
              <h1 className="mt-16 text-center font-mono text-2xl font-bold">
                Formulário para deletar histórias
              </h1>
              <Form {...formDelete}>
                <form
                  onSubmit={formDelete.handleSubmit(handleDelete)}
                  className="space-y-8"
                >
                  <FormField
                    control={formDelete.control}
                    name="video_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID do vídeo</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex. 16..." {...field} />
                        </FormControl>
                        <FormDescription>
                          ID do vídeo que deseja deletar.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant={"outline"}>
                    Submit
                  </Button>
                </form>
              </Form>
            </>
          )}
        </>
      )}
    </div>
  );
}
