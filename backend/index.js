const express = require('express');
const config = require('config');
const app = express();
const PORT = config.get('PORT');
const user = require('./routes/User');
const task = require('./routes/Tasks');
const loginRoute = require('./routes/Login'); // Import the login route module
const signupRoute = require('./routes/SignUp'); // Import the signup route module
// const http = require("http").createServer(app);  // Use http to create the server
// const io = require("socket.io")(http);  
 
// io.on("connection", (socket) => {
//     console.log("User " + socket.id + " connected");

//     socket.on("messageSent", (message) => {
//         socket.broadcast.emit("messageSent", message);
//     });

//     socket.on("taskAdded", (newTask) => {
//         // Broadcast the new task to all connected clients (customer dashboards)
//         socket.broadcast.emit("taskAdded", newTask);
//     });
// });

// http.listen(7072, function () {
//     console.log("Server connected");
// });

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

app.use('/user', user);
app.use('/task', task);


// Use the login and signup route modules
app.use(loginRoute);
app.use(signupRoute);

app.listen(PORT, (error) => {
    if (!error) {
        console.log('Server is Successfully Running, port ' + PORT + ' and App is listening on');
    } else {
        console.log('Error occurred, server can\'t start', error);
    }
});


