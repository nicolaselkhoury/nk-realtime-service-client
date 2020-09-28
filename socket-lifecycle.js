const socketIOClient = require('socket.io-client');
const sailsIOClient = require('sails.io.js');
const io = sailsIOClient(socketIOClient);

io.sails.url = `http://${process.env.BACKEND_SRV_HOST}:${process.env.BACKEND_SRV_PORT}`;
io.sails.autoConnect = false;

let lib = {
    "createSocketClient" : (data) => {
        let socket = io.sails.connect();
        socket.post("/follow", data, (response) => {
            // If there is no error, do something else if needed
            if(response && response.status && response.status === "success")
                // Unfollow the room after a delay between 2 and 5 seconds
                setTimeout(() => {
                    socket.post("/unfollow", data, (response) => {
                        return;
                    });
                }, Math.floor(Math.random() * 15) + 5);
            
        });

        // When a new follow notification is received, display the message received
        socket.on("new_follower_notification", (message) => {
            console.log(`Dear ${data.username} (${socket._raw.id}): ${message}`);
        });

        socket.on("removed_follower_notification", (message) => {
            console.log(`Dear ${data.username} (${socket._raw.id}): ${message}`);
        });
    }
};

module.exports = lib;