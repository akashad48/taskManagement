import Header from "./Header";
import './App.css'
import Home from "./Home";
import Signup from './Signup'
import Login from './Login'
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";
import Addtask from "./Addtask";
function App() {
  return (
    <div >
      <div  className="container"><Header></Header></div>
     
        <Routes>
        <Route path="/" element={ <div><Home></Home></div>} />
        <Route path="/Home" element={ <div><Home></Home></div>} />
        <Route path="/Login" element={<Login></Login>} />
        <Route  path="/Signup" element={<Signup/>} /> 
           
        <Route path="/AdminDashboard" element={<AdminDashboard></AdminDashboard>}>
        <Route exact path="Addtask" element={<Addtask/>} /> 
        </Route>
        <Route path="/CustomerDashboard" element={<CustomerDashboard></CustomerDashboard>}></Route>
       

      
         
        

      </Routes>
    </div>
  );
}

export default App;
