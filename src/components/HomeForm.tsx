import { useState } from "react";
import editorLottie from "../Assets/editor.json";
import Lottie from "react-lottie";
import InputDiv from "./InputDiv";
import USER from "../config/types";
import {v4 as uuidV4} from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HomeForm = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState<USER>({
    socketId:"",
    username:""
  });
  
  const createNewRoom=()=>{
    const id = uuidV4();
    const newUser:USER={
      socketId:id,
      username:"",
    }
    setUser({...newUser});
    toast.success("Create a new room");
  }

  const enterid=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const obj = {...user};
    obj.socketId=e.target.value;
    setUser({...obj});
  }
  
  const enterName=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const obj = {...user};
    obj.username=e.target.value;
    setUser({...obj});
  }

  const joinRoom=()=>{
    if(!user.socketId){
      toast.error("ID is required.");
      return;
    }

    if(!user.username){
      toast.error("username is required.");
      return;
    }

    //redirect
    navigate(`/room/${user.socketId}`,{
      state:{
        username:user.username,
      }
    })
  }
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: editorLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className=" w-[95%] h-[90%] sm:flex flex-col items-center justify-center">
      <div className=" flex flex-col items-center sm:flex-row">
        <div className="w-44 h-44 sm:w-36 sm:h-36 " >
          <Lottie options={defaultOptions} className="shadow-xl" />
        </div>
      
      <div className=" hidden sm:block mr-3 w-[2px] h-[60%] border bg-slate-400 border-slate-400 rounded-lg "></div>
      <div>
          <span className="text-[48px] font-semibold text-[#A4F9EE] font-mono">Live Editor</span>
          <span className="block font-mono font-semibold text-center tracking-wide
          ">Realtime Collaboration</span>
        </div>
      </div>
      <InputDiv user={user} createNewRoom={createNewRoom} enterid={enterid} enterName={enterName} joinRoom={joinRoom}/>
    </div>
  );
};

export default HomeForm;
