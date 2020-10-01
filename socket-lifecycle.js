const socketIOClient = require('socket.io-client');
const sailsIOClient = require('sails.io.js');
const io = sailsIOClient(socketIOClient);

let backendHost = process.env.BACKEND_SRV_HOST || "localhost";
let backendPort = process.env.BACKEND_SRV_PORT || 1337;

io.sails.url = `http://${backendHost}:${backendPort}`;
io.sails.autoConnect = false;
io.sails.reconnection = true;

let lib = {
    "createSocketClient" : (data) => {
        let socket = io.sails.connect({query: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaXNBY3RpdmUiOnRydWUsImlzQWRtaW4iOnRydWUsInBlcnNvbklkIjoiOTI2IiwiZGF0ZSI6IjIwMjAtMTAtMDFUMTI6NTk6MjAuMjU2WiJ9LCJpYXQiOjE2MDE1NTcxNjAsImV4cCI6MTYwNTE1NzE2MH0.TSvqtUeW7CM4ibF8vbQhX29M9ViGrDTorZa4QwR2z8c"});
        socket.on("connect", () => {
            socket.post("/follow", data, (response) => {
                // If there is no error, do something else if needed
                // if(response && response.status && response.status === "success") {
                //     // Unfollow the room after a delay between 2 and 5 seconds
                //     setTimeout(() => {
                //         socket.post("/unfollow", data, (response) => {
                //             return;
                //         });
                //     }, (Math.floor(Math.random() * 5) + 5)* 1000);
                // }
            });
        });


        // When a new follow notification is received, display the message received
        socket.on("new_follower_notification", (message) => {
            console.log(`Dear ${data.username} (${socket._raw.id}): ${message}`);
        });

        socket.on("removed_follower_notification", (message) => {
            console.log(`Dear ${data.username} (${socket._raw.id}): ${message}`);
        });

        socket.on("personal_notification", (message) => {
            console.log(`Personal Notification(${socket._raw.id}): ${message}`);
        });

        socket.on("public_notification", (message) => {
            console.log(`Public Notification (${socket._raw.id}): ${message}`);
        });
        
        socket.on("reconnecting", (attemptNumber) => {
            if(attemptNumber <= 5)
                console.log(`Socket disconnected. Attempting to reconnect. Attempt ${attemptNumber} / 5`);
            else {
                console.log(`Socket disconnected. Exceeded maximum retry attempts. Exiting...`);
                process.exit(0);
            }
        });

    }
};

module.exports = lib;