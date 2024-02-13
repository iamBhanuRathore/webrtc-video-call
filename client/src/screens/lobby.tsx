import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/providers/socket-provider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const JoinRoomSchema = z.object({
  email: z.string().email({
    message: "Enter a email",
  }),
  roomId: z.string().min(1, { message: "Room Id must be 1 digit" }),
});

const LobbyScreen = () => {
  const form = useForm<z.infer<typeof JoinRoomSchema>>({
    resolver: zodResolver(JoinRoomSchema),
    defaultValues: {
      email: "",
      roomId: "",
    },
  });
  const { socket } = useSocket();
  const navigate = useNavigate();
  //   console.log(socket);
  const onSubmit = (values: z.infer<typeof JoinRoomSchema>) => {
    // console.log(values);
    socket?.emit("room:join", {
      email: values.email,
      roomId: values.roomId,
    });
  };
  const handleJoinRoom = (data: any) => {
    navigate(`/room/${data.roomId}`);
  };
  useEffect(() => {
    socket?.on("room:join", handleJoinRoom);
    return () => {
      socket?.off();
    };
  }, [socket]);
  return (
    <div className="flex justify-center items-center">
      <Card className="w-[300px] md:w-[600px] ">
        <CardHeader>
          <CardTitle className="text-center">Lobby Page</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="johndoe@gmail.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roomId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Id</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter room Id" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    //   <form className="">
    //     <Label htmlFor="email">Email</Label>
    //     <Input type="email" placeholder="johndoe@gmail.com" />
    //     <Label htmlFor="roomId">Room Id</Label>
    //     <Input type="text" placeholder="Enter Room Id" />
    //   </form>
  );
};

export default LobbyScreen;
