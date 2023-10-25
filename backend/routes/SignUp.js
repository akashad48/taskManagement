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




app.post('/signup', (req, res) => {
    const { email, password } = req.body; // Assuming the request contains email and password for registration
         console.log(req.body);
       const connection = mysql.createConnection(connectionsettings);
    
       const query = `insert into Users (email,password,role) values( '${req.body.email}','${req.body.password}','employee')`
       connection.query(query, (error, result)=>{
        if(error==null)
        {
        res.setHeader("Content-Type","application/json");
    
        var data = JSON.stringify(result);
        const user = {
      
            email: email,
            password: password,
            role: 'employee'
        };

        const token = generateToken(user);
        res.json({ token });
        connection.end();
      
        }
        else
        {
        res.setHeader("Content-Type","application/json");
        res.status(500).json({ error: 'Registration failed' });
        }
    
        })
    // Assuming the user registration was successful, generate a JWT token
    

});

module.exports = app;
