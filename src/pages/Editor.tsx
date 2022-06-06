import { useEffect, useRef, useState } from "react";
import ACTIONS from "../Actions";
import CodeEditor from "../components/CodeEditor";
import Sidebar from "../components/Sidebar";
import { initSocket } from "../socket";
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import toast from "react-hot-toast";

interface Props {
  username: string;
}

const Editor = () => {
  const socketRef = useRef<any>(null);
  const codeRef = useRef<any>(null);
  const location = useLocation();
  const state = location.state as Props;

  const { roomID } = useParams();
  const reactNavigator = useNavigate();

  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });

    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      function handleError(err) {
        console.log("socket error");
        toast.error("Socket connection failed, try again later");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomID,
        username: state.username,
      });

      //listening for joined event
      socketRef.current.on(ACTIONS.JOINED, ({ client, username, socketId }) => {
        if (username !== state.username) {
          toast.success(`${username} joined the room`);
        }
        setUsers(client);
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        });
      });

      //listening for disconnected...

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setUsers((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    return () => {
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
      socketRef.current.off("connect_error");
      socketRef.current.off("connect_failed");
      socketRef.current.disconnect();
    };
  }, []);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomID as string);
      toast.success("Room id has been copied.");
    } catch (error) {
      toast.error("could not copy room Id");
    }
  };

  const leaveRoom = () => {
    reactNavigator("/");
  };

  return (
    <div className="bg-[#FBFEFB] h-screen w-screen md:flex">
      <div className="">
        <Sidebar user={users} copyRoomId={copyRoomId} leaveRoom={leaveRoom} />
      </div>
      <div className="md:w-full md:h-full">
        <CodeEditor
          socketRef={socketRef}
          roomID={roomID}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
