const io = require("socket.io")(8900,{
    cors:{
        origin:"*"
    }
});

io.on("connection", (socket) => {
    console.log("a user connected");
})