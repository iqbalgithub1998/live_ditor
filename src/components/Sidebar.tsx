import Avatar from "react-avatar";
import { BoxArrowRight, Clipboard2CheckFill } from "react-bootstrap-icons";

const Sidebar = ({ user, copyRoomId, leaveRoom }) => {
  return (
    <>
      <div className="p-2 w-full md:hidden ">
        <div className="w-full flex justify-end">
          <div
            onClick={copyRoomId}
            className={`bg-white rounded-lg shadow-md w-32 h-10 flex justify-center items-center mx-2 hover:bg-[#fefefe] active:shadow-lg  `}
          >
            <span className="font-mono text-lg"> Copy&nbsp;</span>
            <Clipboard2CheckFill />
          </div>
          <div
            onClick={leaveRoom}
            className={`bg-[#3FE97E] rounded-lg shadow-md w-24 h-10 flex justify-center items-center hover:bg-[#3ad773] active:shadow-lg active:bg-[#3ad773] `}
          >
            <span className="font-mono text-lg">Leave&nbsp;</span>{" "}
            <BoxArrowRight />
          </div>
        </div>
        <div className="flex overflow-y-scroll ">
          {user.map((obj) => (
            <div
              key={obj.socketId}
              className="flex justify-center items-center flex-col p-2 min-w-[100px] text-center "
            >
              <Avatar name={obj.username} size="50" round="10px" />
              <span className="block text-sm font-mono ">{obj.username}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden  p-3 h-[100vh] max-h-[100vh] md:flex md:flex-col  w-64 ">
        {/* title */}
        <div>
          <span className="text-[30px] text-[#A4F9EE] font-mono">
            Live Editor
          </span>
          <span className="block font-mono font-semibold tracking-wide">
            Realtime Collaboration
          </span>
        </div>
        <div className="w-full h-[2px] bg-slate-400 rounded-md my-3"></div>
        {/* connected user  */}
        <div>
          <span className="block font-mono font-semibold ">Connected</span>
          <div className="grid grid-cols-2 max-h-[60vh] min-h-[20vh] overflow-y-scroll">
            {user.map((obj) => (
              <div
                key={obj.socketId}
                className="flex justify-center items-center flex-col p-2 min-w-[100px] text-center "
              >
                <Avatar name={obj.username} size="50" round="10px" />
                <span className="block text-sm font-mono ">{obj.username}</span>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex-grow flex flex-col justify-end items-center">
          <div
            onClick={copyRoomId}
            className={`bg-white rounded-lg shadow-md w-[95%] h-10 flex justify-center items-center my-3  hover:bg-[#fefefe] active:shadow-xl hover:cursor-pointer `}
          >
            <span className="font-mono text-lg"> Copy&nbsp;</span>
            <Clipboard2CheckFill />
          </div>
          <div
            onClick={leaveRoom}
            className={`bg-[#3FE97E] rounded-lg shadow-md w-[95%] h-10 flex justify-center items-center hover:bg-[#3ad773] active:shadow-xl active:bg-[#3ad773] hover:cursor-pointer `}
          >
            <span className="font-mono text-lg">Leave&nbsp;</span>{" "}
            <BoxArrowRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
