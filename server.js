const express = require('express');
const http = require('http');
const path = require('path');
const { join } = require('path');
const {Server} = require('socket.io');
const ACTIONS = require('./src/Actions');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('build'));
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'build','index.html'));
})

const userSocketMap = {};

function getAllConnectedClient(roomID){
    return Array.from(io.sockets.adapter.rooms.get(roomID) || []).map((socketId)=>{
        return{
            socketId,
            username:userSocketMap[socketId],
        }
    })
}

io.on('connection',(socket)=>{

    socket.on(ACTIONS.JOIN,({roomID,username})=>{
        userSocketMap[socket.id] = username;
        socket.join(roomID);
        const client = getAllConnectedClient(roomID);
        client.forEach(({socketId})=>{
            io.to(socketId).emit(ACTIONS.JOINED,{
                client,
                username,
                socketId:socket.id,
            });
        });
    });


    socket.on(ACTIONS.CODE_CHANGE,({roomID,code})=>{
        
        socket.in(roomID).emit(ACTIONS.CODE_CHANGE,{
            code
        });
    })

    socket.on(ACTIONS.SYNC_CODE,({socketId,code})=>{
        
        io.to(socketId).emit(ACTIONS.CODE_CHANGE,{code});
    })

    socket.on('disconnecting',()=>{
        const rooms = [...socket.rooms];
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
                socketId:socket.id,
                username:userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    })
});

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT}`);
})



