import httpClient from '../http-user';

//var assignedBy = window.sessionStorage.getItem("userName");

var get=(data)=>{
    return httpClient.post('task/assignedBy/'+data)
      
    }

 export default {get};   
