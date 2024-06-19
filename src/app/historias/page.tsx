import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function page() {
  return (
    <div className="container mt-8">
      <div className="flex text-center justify-between items-center">
        <div className="flex text-center items-center gap-2">
          <Label htmlFor="input">Pesquise uma história pelo nome</Label>
          <Input
            placeholder="Ex: ovelha leva gank ... "
            id="input"
            className="w-[300px]"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Filtre por categoria de vídeo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>História Bizarra</CardTitle>
            <CardDescription>
              Ovelha conta história do pau melado de cocô
            </CardDescription>
          </CardHeader>
          <CardContent>
            <iframe
              src="https://www.youtube.com/embed/-3s_I49PidY"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full h-[300px]"
            ></iframe>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Badge variant="default">Nojeira</Badge>
            <Badge variant="default">Paulada</Badge>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>História Bizarra</CardTitle>
            <CardDescription>
              Ovelha conta história do pau melado de cocô
            </CardDescription>
          </CardHeader>
          <CardContent>
            <iframe
              src="https://www.youtube.com/embed/-3s_I49PidY"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full h-[300px]"
            ></iframe>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Badge variant="default">Nojeira</Badge>
            <Badge variant="default">Paulada</Badge>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>História Bizarra</CardTitle>
            <CardDescription>
              Ovelha conta história do pau melado de cocô
            </CardDescription>
          </CardHeader>
          <CardContent>
            <iframe
              src="https://www.youtube.com/embed/-3s_I49PidY"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full h-[300px]"
            ></iframe>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Badge variant="default">Nojeira</Badge>
            <Badge variant="default">Paulada</Badge>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>História Bizarra</CardTitle>
            <CardDescription>
              Ovelha conta história do pau melado de cocô
            </CardDescription>
          </CardHeader>
          <CardContent>
            <iframe
              src="https://www.youtube.com/embed/-3s_I49PidY"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full h-[300px]"
            ></iframe>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Badge variant="default">Nojeira</Badge>
            <Badge variant="default">Paulada</Badge>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
