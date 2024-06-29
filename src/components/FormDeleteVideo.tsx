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
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  video_id: z.string().min(1),
});

export default function FormDeleteVideo() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      video_id: "",
    },
  });

  async function handleDelete(values: z.infer<typeof formSchema>) {
    const response = await api.get(`/videos/${values.video_id}`);
    const urlVideo = response.data.url;
    const logData = {
      name: session?.user?.name,
      action: "Deletou um vídeo",
      date: new Date().toLocaleDateString("pt-BR"),
      url: urlVideo,
    };
    try {
      await api.delete(`/videos/${values.video_id}`);
      form.reset();
      await api.post("/logs/", logData);
      toast({
        description:
          "Vídeo de id " + values.video_id + " deletado com sucesso.",
        variant: "default",
      });
    } catch (error) {
      form.reset();
      toast({
        description: "Houve um erro ao deletar o video.",
        variant: "destructive",
      });
    }
  }
  return (
    <>
      <h1 className="mt-16 text-center font-mono text-2xl font-bold">
        Formulário para deletar histórias
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleDelete)} className="space-y-8">
          <FormField
            control={form.control}
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
          <Button
            type="submit"
            variant="outline"
            className="flex items-center gap-2 border-b-red-500 border-l-yellow-500 border-r-yellow-500 border-t-green-500"
          >
            Deletar Vídeo
            <Trash size={18} />
          </Button>
        </form>
      </Form>
    </>
  );
}
