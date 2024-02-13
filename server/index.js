const { Server } = require('socket.io');
const io = new Server(8000, { cors: true });


const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();
// const emailToSocketIdMap = {};
// const socketIdToEmailMap = {};
// when a user extablish connection with the socket
io.on('connection', socket => {
    console.log('Socket Connected', socket.id);

    socket.on('room:join', ({ email, roomId }) => {
        socketIdToEmailMap.set(socket.id, email);
        emailToSocketIdMap.set(email, socket.id);

        // socketIdToEmailMap[socket.id] = email;
        // emailToSocketIdMap[email] = socket.id;

        console.log({ a: emailToSocketIdMap, b: socketIdToEmailMap });

        // giving the already joined in user a message that a new user is joining
        io.to(roomId).emit('user:joined', { email, id: socket.id });

        // join this socket with the room socket
        socket.join(roomId);

        // sending this message to the user who joined
        io.to(socket.id).emit('room:join', { email, roomId });
    });
});