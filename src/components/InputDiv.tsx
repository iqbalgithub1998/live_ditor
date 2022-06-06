import React from 'react'
import Input from './Input'

const InputDiv = ({user,createNewRoom,enterid,enterName,joinRoom}) => {
  return (
    <div className=' p-3 w-full  max-w-xl bg-white rounded-xl border shadow-lg' >
      <span className=" mb-4 block text-lg font-mono  tracking-wide">Enter invitation ROOM ID</span>
      <Input placeholder='Room ID' value={user.socketId.length!==0 ?user.socketId:""} enterValue={enterid}/>
      <Input placeholder='USERNAME' value={user.username.length!==0 ?user.username:""} enterValue={enterName} />
      <div className="w-full flex justify-end">
        <button className="border bg-[#3edf79] px-6 py-2 font-mono text-base rounded-lg hover:bg-[#46e681] active:shadow-md active:border-[#3edf79] " onClick={joinRoom} >Join</button>
      </div>
      <div className='w-full text-center'>
      <span className="text-[14px] font-mono ">If you don’t have an invite then create 
              <span className="text-[#3EDF79] hover:cursor-pointer" onClick={createNewRoom}> new room</span></span>
      </div>
    </div>
  )
}

export default InputDiv;