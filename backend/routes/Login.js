const express = require('express');
const app = express.Router();
const { generateToken } = require('../middlewares/authentication');
const config = require('config');
const mysql = require('mysql');
const connectionsettings={
    host:config.get('dbSettings.host'),
    user:config.get('dbSettings.user'),
    password:config.get('dbSettings.password'),
    database:config.get('dbSettings.database')
}
app.post('/Login', (req, res) => {
   
    const { email, password } = req.body; 

    
    const connection = mysql.createConnection(connectionsettings);

   
    const query = `SELECT Userid, email, role FROM Users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
    connection.query(query, (error, results) => {
        if (error) {
            connection.end();
            return res.status(500).json({ message: 'Database error' });
        }

        if (error==null) {
            // User is authenticated
            const user = results[0];
            console.log(user);
            const token = generateToken(user);
            res.json({ token });
        } else {
            // Authentication failed
            res.status(401).json({ message: 'Authentication failed' });
        }

        connection.end();
    });
});





module.exports = app;
