# Introduction
The **nk-realtime-service** project serves as a pilot project and/or a reference to be used by anyone who wishes to write software and learn [sockets]().

# Pre-requisites
The client will not work unless the [backend server](https://github.com/nicolaselkhoury/nk-realtime-service) is up and running.

# Installation
In order to run the client, download the repository and perform the following steps:

1. ```npm install```
2. ```export BACKEND_SRV_HOST=<the host of the backend server> (default value: localhost)```
3. ```export BACKEND_SRV_PORT=<the port of the backend server> (default value: 1337)```
4. ```node index.js```

# Code explanation
The index file instantiates several clients connecting to the backend server and perform the scenario below:

1. Connect to the backend.
2. A user follows another user (user joins room).
3. The user unfollows that user (user leaves room).

Moreover, the client listens to two events (__new_follower_notification__ and __removed_follower_notification__), and logs the messages received from these events.

# Future work
This is a simple project and requires further enhancements, which include but not limited to:

1. Add more features to highlight the different functionalities of sockets.
2. Create more realistic scenarios.
3. User authentication.
4. Better handling of connection errors.