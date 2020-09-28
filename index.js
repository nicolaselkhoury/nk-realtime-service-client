const socket1 = require('./socket-lifecycle').createSocketClient({username: "Nicolas", room: "Alice"});
const socket2 = require('./socket-lifecycle').createSocketClient({username: "Bob", room: "Alice"});
const socket3 = require('./socket-lifecycle').createSocketClient({username: "Mike", room: "Alice"});

const socket4 = require('./socket-lifecycle').createSocketClient({username: "Alice", room: "Bob"});
const socket5 = require('./socket-lifecycle').createSocketClient({username: "Mark", room: "Bob"});