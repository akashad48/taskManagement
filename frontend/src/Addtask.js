import { useState,useEffect } from 'react';
import axios from 'axios';
// import io from 'socket.io-client';

// const socket = io('http://localhost:7072');

function Addtask({ onClose }){
    const [showAddTaskForm, setShowAddTaskForm] = useState(true); 
    //to get token from session storage
    let token1 = window.sessionStorage.getItem("token");
    const parsedObject = JSON.parse(token1);
    const token = parsedObject.data.token
    console.log(token)
    //token specific format 
const config = {
 headers: {
   Authorization: `Bearer ${token}`,
 },
};
// dat should be in format to yyyy-mm-dd hh:m:ss
const currentDateTime = new Date();
const formattedDate = `${currentDateTime.getFullYear()}-${String(currentDateTime.getMonth() + 1).padStart(2, '0')}-${String(currentDateTime.getDate()).padStart(2, '0')}`;
const formattedTime = `${String(currentDateTime.getHours()).padStart(2, '0')}:${String(currentDateTime.getMinutes()).padStart(2, '0')}:${String(currentDateTime.getSeconds()).padStart(2, '0')}`;

const initialDate = `${formattedDate} ${formattedTime}`;
    const [formData, setFormData] = useState({
        Type: '',
        employeeid: 0,
        title: '',
        description: '',
        status: false,
        assignedTo: '',
        assignedBy: '',
        date: initialDate
      });
      const handleSubmit = (e) => {
        e.preventDefault();
           //to convert token string in object 

        
        console.log(formData);
        try {
     
            const fetchData = async () => {
            
              const response = await axios.post('http://localhost:7072/task/', formData,config);
              console.log('Response from the server:', response.data);
              console.log(response.status)
              
              
            };
        
            fetchData();
          } catch (error) {
            console.error('Error:', error);
          }


           //this function will be called after form submission
          onClose();
      };
    
       return(
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="Type"
            value={formData.Type}
            onChange={(e) => setFormData({ ...formData, Type: e.target.value })}
          />
        </div>
  
        <div className="mb-3">
          <label htmlFor="employeeid" className="form-label">
            Employee ID
          </label>
          <input
            type="number"
            className="form-control"
            id="employeeid"
            name="employeeid"
            value={formData.employeeid}
            onChange={(e) => setFormData({ ...formData, employeeid: e.target.value })}
          />
        </div>
  
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
  
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
  
       
  
        <div className="mb-3">
          <label htmlFor="assignedTo" className="form-label">
            Assigned To
          </label>
          <input
            type="text"
            className="form-control"
            id="assignedTo"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
          />
        </div>
  
        <div className="mb-3">
          <label htmlFor="assignedBy" className="form-label">
            Assigned By
          </label>
          <input
            type="text"
            className="form-control"
            id="assignedBy"
            name="assignedBy"
            value={formData.assignedBy}
            onChange={(e) => setFormData({ ...formData, assignedBy: e.target.value })}
          />
        </div>
  
       
  
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
       
    )
}
export default Addtask;