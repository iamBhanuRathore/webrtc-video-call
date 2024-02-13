import { toast } from "sonner";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/providers/socket-provider";
// import { JOIN_USER } from "../../../constants.js";

const RoomScreen = () => {
  const { socket } = useSocket();
  const [connectedUsers, setConnectedUsers] = useState<
    Array<Record<string, string>>
  >([]);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const handleUserJoin = (data: { email: string }) => {
    console.log(data);
    setConnectedUsers((p) => [...p, { email: data?.email }]);
    toast(`A new User Joined ${data.email}`);
  };
  useEffect(() => {
    socket?.on("user:joined", handleUserJoin);
    return () => {
      socket?.off("user:joined", handleUserJoin);
    };
  }, []);
  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
      //   peerIdentity: "",
      //   preferCurrentTab: true,
    });
    setMyStream(stream);
  };
  return (
    <div className="text-white">
      <h1>This is my Room page</h1>
      {connectedUsers.length
        ? "No One in the Room"
        : "You are connected to the room"}
      {/* <p>{!!connectedUsers.length && ( */}
      <Button onClick={startCall}>Call</Button>
      {/* )}</p> */}
      {myStream && (
        <div>
          <ReactPlayer muted height={500} width={500} playing url={myStream} />
        </div>
      )}
    </div>
  );
};
export default RoomScreen;
