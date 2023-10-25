import httpClient from '../http-user';

//var userId = window.sessionStorage.getItem("userId");

const create = (data) => {
  return httpClient.post('/login', data);
};





export default { create };
