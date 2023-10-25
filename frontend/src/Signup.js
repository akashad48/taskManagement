import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//var atob = require('atob');

function Signup(){
  const [credentials, setCredentials] =  useState({email:"", password:""});
    const navigate =useNavigate();

    var OnTextChanged = (args)=>{
      var copyOfcredentials = {...credentials};
      copyOfcredentials[args.target.name] =
          args.target.value;
      setCredentials(copyOfcredentials);
   } 

const handlesubmit =async ()=>{
  console.log(credentials);
  debugger;
 
try {
      const response = await axios.post('http://localhost:7072/signup/', credentials);

      
      console.log('Response from the server:', response.data);
      if(response.status==200){
        navigate('/Login');
      }
    } catch (error) {

      console.error('Error:', error);
    }
  


}

    return(
        <section class="vh-100" style={{backgroundColor: "#eee"}}>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-4"style={{marginTop: "30px"}}>
        <div className="card text-center" style={{height: "350px"}}>
         
          <div className="d-flex align-items-center justify-content-center vh-100">
      <form className="form-signin">
        
        <h1 className="h3 mb-3 font-weight-normal">Please sign Up</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input type="email" id="inputEmail" className="form-control"
          placeholder="Email address" required autoFocus name='email'
          value={credentials.email}
          onChange={OnTextChanged}
          
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          name='password'
          value={credentials.password}
          onChange={OnTextChanged}
        />
        <br></br>
        <button className="btn btn-lg btn-primary btn-block" type="button" onClick={handlesubmit}>
          Register
        </button>
        <br></br>
      
        
      
      </form>
    </div>

          </div>
        </div>
      </div>
    </div>
  
</section>
    )
}
export default Signup;