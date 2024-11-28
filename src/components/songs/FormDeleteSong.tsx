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
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addSongLog } from "../../actions/logsActions";
import { deleteSong, getSongById } from "../../actions/songsActions";

const formSchema = z.object({
  song_id: z.string().min(1, "O campo é obrigatório"),
});

export function FormDeleteSong() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      song_id: "",
    },
  });

  async function handleDelete(values: z.infer<typeof formSchema>) {
    try {
      const song = await getSongById(values.song_id);

      if (!song) {
        toast({
          title: "Erro",
          description: `Música de ID ${values.song_id} não encontrada!`,
        });
        form.reset();
        return;
      }
      const urlSong = song.url;

      await deleteSong(values.song_id);

      const logData = {
        name: session?.user?.name ?? "",
        action: "Deletou uma música",
        url: urlSong,
        date: new Date().toLocaleString("pt-BR"),
      };

      await addSongLog(logData);

      form.reset();
      toast({
        description: "Música de id " + values.song_id + " deletada com sucesso.",
        variant: "destructive",
      });
    } catch (error) {
      form.reset();
      toast({
        description: "Houve um erro ao deletar a música.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="mt-16 text-center font-mono text-2xl font-bold">
        Formulário para deletar músicas
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleDelete)} className="space-y-8">
          <FormField
            control={form.control}
            name="song_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID da música</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. 16..." {...field} />
                </FormControl>
                <FormDescription>
                  ID da música que deseja deletar.
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
            Deletar Música
            <Trash size={18} />
          </Button>
        </form>
      </Form>
    </div>
  );
}