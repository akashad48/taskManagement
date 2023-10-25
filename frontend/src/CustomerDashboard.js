import { useState,useEffect } from 'react';
import './dashboard.css'
import TaskService from './service/TaskService';
import axios from 'axios';
import Addtask from './Addtask';
import { Link, useNavigate } from "react-router-dom";
// const socket = require('socket.io');

//  socket = io("http://localhost:7072");
 
    

function CustomerDashboard(){

    const employeeid=window.sessionStorage.getItem('userId');
    const [config,setconfig]=useState({
        "Taskid": 0,
        "employeeid": employeeid
    })
    const [tasklist, setTasklist] = useState([
        {"Taskid": 0,
        "Type": " ",
        "employeeid": 0,
        "title": " ",
        "discription": " ",
        "status": false,
        "assignedTo": " ",
        "assignedBy": " ",
        "date": " "
     } ]);

     //to fetch data on page load 
    useEffect(() => {
   
    //   socket.on('taskAdded', (newTask) => {
      
    //     setTasklist((prevTasklist) => [...prevTasklist, newTask]);
    //     toast.success('New task added successfully!', {
    //       position: 'top-right',
    //       autoClose: 3000,
    //   });

    // });

       
        try {
         
          const fetchData = async () => {
          
            const response = await axios.get(`http://localhost:7072/task/${employeeid}`);
            console.log('Response from the server:', response.data);
            setTasklist(response.data);
          };
      
          fetchData();
        } catch (error) {
          console.error('Error:', error);
        }
      }, []);


//to mark status = true ie mark as completed
      const handleStatus = (taskid) => {
   
        const updatedConfig = {
            ...config,
            Taskid: taskid,
          };
   setconfig(updatedConfig)
   console.log("config object"+config);
debugger;
   axios
     .put(`http://localhost:7072/task/`, updatedConfig)
     .then((response) => {

       debugger;
       console.log('Task updated:', response.data);
       window.location.reload();
     })
     .catch((error) => {
       console.error('Error removing task:', error);
     });
 };



    return(
        <section style={{background: "#eee",maxWidth:'80%',margin:'auto',overflowY: 'auto'}}>
                       
  

<div class="container py-5">

{tasklist.map((task) => (
  <div class="row justify-content-center mb-4" >
    <div class="col-md-12 col-xl-10">
      <div class="card shadow-0 border rounded-3">
        <div class="card-body">
          <div class="row">
          
            <div class="col-md-9 col-lg-9 col-xl-9">
              <h5>{task.title}</h5>
              <div class="d-flex flex-row"></div>
              <div class="mt-1 mb-0 text-muted small">
                <span>Task Id:</span>
                <span class="text-primary">{task.Taskid}</span>
                <br />
                <span>type :</span>
                <span class="text-primary">{task.Type}</span>
                <br />
                <span>assigned To :</span>
                <span class="text-primary">{task.assignedTo}</span>
                <br />
                <span>Discription :</span>
                <span class="text-primary">{task.discription}</span>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
              <div class="d-flex flex-row align-items-center mb-1">
                <h4 class="mb-1 me-1">{}</h4>
              </div>
              <h6 class="text-success">status: {task.status ? 'Completed' : 'Not Completed'}</h6>

              <div class="d-flex flex-column mt-4">
               
                <br></br>
                <button type="button" class="btn btn-danger"  onClick={() => handleStatus(task.Taskid)}  >Mark as complete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
))}
</div>

</section>
    )
}
export default CustomerDashboard;