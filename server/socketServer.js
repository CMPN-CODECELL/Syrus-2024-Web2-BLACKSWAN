const { Server } = require("socket.io");

function initializeSocketServer(server) {
    const io = new Server(server, {
        cors: true,
    });

    const EmailToSocketIdMap = new Map();
    const socketidToIdMap = new Map();

    io.on("connection", (socket) => {
        console.log(`Socket Connected`, socket.id);
        socket.on("room:join", (data) => {
            const { email, room } = data;
            EmailToSocketIdMap.set(email, socket.id);
            socketidToIdMap.set(socket.id, email);
            io.to(room).emit("user:joined", { email, id: socket.id });
            socket.join(room);
            io.to(socket.id).emit("room:join", data);
        });

        socket.on("user:call", ({ to, offer }) => {
            io.to(to).emit("incomming:call", { from: socket.id, offer });
        });

        socket.on("call:accepted", ({ to, ans }) => {
            io.to(to).emit("call:accepted", { from: socket.id, ans });
        });

        socket.on("peer:nego:needed", ({ to, offer }) => {
            console.log("peer:nego:needed", offer);
            io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
        });

        socket.on("peer:nego:done", ({ to, ans }) => {
            console.log("peer:nego:done", ans);
            io.to(to).emit("peer:nego:final", { from: socket.id, ans });
        });
    });
}

module.exports = initializeSocketServer;
