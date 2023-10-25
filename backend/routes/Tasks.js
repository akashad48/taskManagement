const express = require('express');
const mysql = require('mysql');
const app = express.Router();
const config = require('config');
const { authenticateJWT, authorizeRoles } = require('../middlewares/authentication');
const connectionsettings={
    host:config.get('dbSettings.host'),
    user:config.get('dbSettings.user'),
    password:config.get('dbSettings.password'),
    database:config.get('dbSettings.database')
}

//perticular employees tasks
app.get('/:employeeid',(request,response)=>{
    const connection = mysql.createConnection(connectionsettings);
    console.log(request.params.employeeid)
    connection.query(`select * from Tasks where employeeid =${request.params.employeeid}`,(error,data)=>{
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
//admins taskss
app.post('/assignedBy',(request,response)=>{
    const connection = mysql.createConnection(connectionsettings);
    console.log(request.body)
    connection.query(`select * from Tasks where assignedBy='${request.body.assignedBy}'`,(error,data)=>{
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


//add the task 
app.post("/", authenticateJWT(), authorizeRoles(['ADMIN']),(request,response)=>{
    console.log(request.body);
    var connection = mysql.createConnection(connectionsettings);
    const query = `
    INSERT INTO Tasks (Type, employeeid, assignedTo, assignedBy, title, date, discription) 
    VALUES (
      '${request.body.Type}',
      ${request.body.employeeid},
      '${request.body.assignedTo}',
      '${request.body.assignedBy}',
      '${request.body.title}',
      '${request.body.date}',
      '${request.body.discription}'
    )`;
    // const newTask = {
    //     Type: request.body.Type,
    //     employeeid: request.body.employeeid,
    //     assignedTo: request.body.assignedTo,
    //     assignedBy: request.body.assignedBy,
    //     title: request.body.title,
    //     date: request.body.date,
    //     discription: request.body.discription
    // };

    connection.query(query, (error, result)=>{
    if(error==null)
    {    

        
    
        // Emit the "taskAdded" event to notify connected clients (customer dashboards)
        // io.emit('taskAdded', newTask);

    response.setHeader("Content-Type","application/json");

    var data = JSON.stringify(result);
    connection.end();
    response.send(data);
    }
    else
    {
    response.setHeader("Content-Type","application/json");
    response.send(error);
    }

    })
})

//delete task 
app.delete('/:Taskid' ,authenticateJWT(), authorizeRoles(['ADMIN']),(request,response)=>{

    var connection = mysql.createConnection(connectionsettings);
    console.log(request.params.Taskid);
    const query =`delete from Tasks where Taskid=${request.params.Taskid}`;
    connection.query(query,(error,result)=>{
        if(error==null){
            response.setHeader("Content-Type","application/json");
            var data = JSON.stringify(result);
            connection.end();
            response.send(data);
        }
        else{
            response.setHeader("Content-Type","application/json");
            response.send(error);
        }
    })
})

//to mark task is completed
app.put("/",(req,res)=>{
    const connection = mysql.createConnection(connectionsettings);
    const query=`update Tasks set status=true where Taskid=${req.body.Taskid} and employeeid='${req.body.employeeid}'`
    connection.query(query,(error,result)=>{
        if(error==null){
            res.setHeader("Content-Type","application/json");
            var data = JSON.stringify(result);
            connection.end();
            res.send(data);
        }
        else{
            res.setHeader("Content-Type","application/json");
            res.send(error);
        }
    })
})





module.exports = app;