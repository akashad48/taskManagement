const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const config = require('config');
const connectionsettings={
    host:config.get('dbSettings.host'),
    user:config.get('dbSettings.user'),
    password:config.get('dbSettings.password'),
    database:config.get('dbSettings.database')
}


app.get('/',(request,response)=>{
    const connection = mysql.createConnection(connectionsettings);
    connection.query("select * from Users",(error,data)=>{
        if(error==null){
            response.setHeader("Content-Type","application/json");
            var result= JSON.stringify(data);
            connection.end();
            response.send(result);

        }
        else
        {
            response.setHeader("Content-Type","application/json");
            response.send(error);
        }
    })
    
})






module.exports = app;