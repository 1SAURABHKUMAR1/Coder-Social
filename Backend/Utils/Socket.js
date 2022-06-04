let activeUsers = [];

const findConnectedUser = (userId) => {
    return activeUsers.find((user) => user.userId === userId);
};

const removeUser = (userId) => {
    return activeUsers.filter((user) => user.userId !== userId);
};

const addUser = async (userId, socketId) => {
    const user = findConnectedUser(userId);
    if (user && user.socketId === socketId) {
        return activeUsers;
    } else {
        if (user && user.socketId !== socketId) {
            activeUsers = removeUser(user.userId);
        }
        activeUsers.push({ userId, socketId });
        return activeUsers;
    }
};

exports.socketHandler = (io) => {
    return io.on('connection', (socket) => {
        console.log('Socket is on');

        socket.on('joinNewUser', async ({ userId }) => {
            const activeUsers = await addUser(userId, socket.id);

            setInterval(() => {
                socket.emit('connectedUsers', {
                    activeUsers: activeUsers.filter(
                        (user) => user.userId !== userId,
                    ),
                });
            }, 300000);
        });

        socket.on('likedPost', async ({ postId, sender, reciever }) => {
            if (sender && reciever.userId !== sender.userId) {
                const recieverSocketIo = findConnectedUser(
                    reciever.userId.toString(),
                );

                if (recieverSocketIo) {
                    io.to(recieverSocketIo.socketId).emit('newNotification', {
                        postId,
                        senderName: sender.name,
                        senderImage: sender.profile_image,
                        recieverName: reciever.name,
                        recieverId: reciever.userId,
                        date: new Date(),
                    });
                }
            }
        });

        socket.on('commentPost', async ({ postId, sender, reciever }) => {
            if (sender && reciever.userId !== sender.userId) {
                const recieverSocketIo = findConnectedUser(
                    reciever.userId.toString(),
                );

                if (recieverSocketIo) {
                    io.to(recieverSocketIo.socketId).emit('newNotification', {
                        postId,
                        senderName: sender.name,
                        senderImage: sender.profile_image,
                        recieverName: reciever.name,
                        recieverId: reciever.userId,
                        date: new Date(),
                    });
                }
            }
        });

        socket.on('follow', async ({ sender, reciever }) => {
            if (sender && reciever.userId !== sender.userId) {
                const recieverSocketIo = findConnectedUser(
                    reciever.userId.toString(),
                );

                if (recieverSocketIo) {
                    io.to(recieverSocketIo.socketId).emit('newNotification', {
                        senderName: sender.name,
                        senderImage: sender.profile_image,
                        recieverName: reciever.name,
                        recieverId: reciever.userId,
                        date: new Date(),
                    });
                }
            }
        });

        socket.on('disconnectUser', ({ userId }) => {
            removeUser(userId);
        });
    });
};
