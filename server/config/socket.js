const { Server } = require('socket.io');
const { chat_room_service, messages_service } = require('../../Server/services');

module.exports = async (server) => {
    const io = new Server(server,{
        cors: {
            origin: "http://localhost:3000",
            // methods: ["GET", "POST", "PUT", "DELETE"],
        }
    })

    io.on("connection", (socket) => {
        console.log('Socket.io is connected socketId: ', socket.id);
        socket.on("disconnect", () => {
            console.log('Socket.io is disconnected socketId: ', socket.id);
        });
        socket.on("join", (roomId) => {
            socket.emit("run",{})
            console.log('roomId: ', roomId);
            socket.join(roomId);
        });
        socket.on('send-message',async (data)=>{
            console.log('data: ', data);
            try {
                const response = await messages_service.send_message(data)
                console.log('response: ', response);
                if (response) {
                    io.to(data.chat_room).emit('receivemessage',response);
                }
            } catch (error) {
                console.log('error: ', error);
                
            }

        })
    }); 
}

