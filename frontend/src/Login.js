import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userService from "./service/user.service";
var atob = require('atob');

const Login = () => {
    const navigate= useNavigate();
  const [cred,setCred] = useState({email:"", password:""});

     var {userId} = useState({ "userId": 0,});
    

  var onChange = (args) =>{
   var  copycred = {...cred};
    copycred[args.target.name] = args.target.value;
    setCred(copycred);
  }
  
  const state = useLocation();



  var signIn = () =>{
    const cred2 = {
          email : cred.email,
          password : cred.password
        } 
        debugger;
    userService.create(cred2)
                .then((response) =>{
                  const token = JSON.stringify(response);
                  const parts = token.split('.');
                  const encodedPayload = parts[1];
                  console.log(encodedPayload)
               //encoding the splitted token 
               const decodedPayload = atob(encodedPayload);
               //parsing object to json
               const payloadObject = JSON.parse(decodedPayload);


                  console.log("This is sign in" + payloadObject)
                  var userId = payloadObject.id;
                  var role=payloadObject.role;
                  

                
                  
                  debugger;
                  window.sessionStorage.setItem("isUserLoggedIn" , "true");
                  window.sessionStorage.setItem("role" , role);
                  window.sessionStorage.setItem("userId" , userId);
                  window.sessionStorage.setItem("userName",payloadObject.email);
                  window.sessionStorage.setItem("token",token);
                  debugger;
                  if(role==="employee"){
                     navigate("/CustomerDashboard");
                     navigate(0);
                  }
                 
                  else if(role==="ADMIN"){
                    navigate("/AdminDashboard");
                    navigate(0);
                  }
                  
                })
                .catch((error) =>{
                  debugger;
                  console.log("Error Occured" + error)
                })
                
  }


  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-4"style={{marginTop: "30px"}}>
        <div className="card text-center" style={{height: "350px"}}>
         
          <div className="d-flex align-items-center justify-content-center vh-100">
      <form className="form-signin">
        
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input type="email" id="inputEmail" className="form-control"
          placeholder="Email address" required autoFocus name='email'
          value={cred.email}
          onChange={onChange}
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
          value={cred.password}
          onChange={onChange}
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="button" onClick={signIn}>
          Sign in
        </button>
        <br></br>
        <a>Don't have Account</a>
        <Link to="/EmailSignup">Register</Link>
        <br></br>
       <Link to="/forgotPassword">Forgot Password</Link>
      </form>
    </div>

          </div>
        </div>
      </div>
    </div>
  
  );
};

export default Login;
