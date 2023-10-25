import { useState,useEffect } from 'react';
import './dashboard.css'
import TaskService from './service/TaskService';
import axios from 'axios';
import Addtask from './Addtask';
import { Link, useNavigate } from "react-router-dom";


function AdminDashboard(){
  const navigate =useNavigate();
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
  
 const obj = { assignedBy: window.sessionStorage.getItem("userName") };
 let token1 = window.sessionStorage.getItem("token");
  useEffect(() => {
   


    console.log(obj);
    try {
     
      const fetchData = async () => {
      
        const response = await axios.post('http://localhost:7072/task/assignedBy', obj);
        console.log('Response from the server:', response.data);
        setTasklist(response.data);
      };
  
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);
  
  const handleRemoveTask = (taskid) => {
   
         //to convert token string in object 
         const parsedObject = JSON.parse(token1);
         const token = parsedObject.data.token
         console.log(token)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
debugger;
    axios
      .delete(`http://localhost:7072/task/${taskid}`, config)
      .then((response) => {
        // Handle the response as needed, e.g., remove the task from the UI
        console.log('Task removed:', response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error removing task:', error);
      });
  };
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const handleAddTaskClick = () => {
    debugger;
    setShowAddTaskForm(true);
  };

//this function will,get called as "onclose" function is called from component addtask
  const closeAddTaskForm = () => {
    setShowAddTaskForm(false);
    window.location.reload();
  };

    return(
         <section >
            <div className='section'>
                  <div class="dashboard-option" onClick={handleAddTaskClick}>Add Task</div>
                 
                  </div>   

                  <section style={{background: "#eee",maxWidth:'80%',margin:'auto',overflowY: 'auto'}}>
                       
                  {showAddTaskForm && (
        <Addtask onClose={closeAddTaskForm} />
      )}

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
                          <button type="button" class="btn btn-danger"   onClick={() => handleRemoveTask(task.Taskid)}  >remove</button>
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
         </section>
          


    );
}
export default AdminDashboard;