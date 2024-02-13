import "./App.css";
import { Routes, Route } from "react-router-dom";
import LobbyScreen from "./screens/lobby";
import RoomScreen from "./screens/room";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomScreen />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
