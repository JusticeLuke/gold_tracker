import axios from 'axios';

const websiteUrl = window.location.href;
const endpoint = websiteUrl.includes("witty-cliff")
  ? "https://goldtracker.azurewebsites.net"
  : "http://localhost:8000";
interface User {
  username?: string;
  password?: string;
  user_id?: string;
  auth_token?: string;
}

//Create a new user, and returns json of response
export async function createUser(data: User) {
  const newUser = await axios.post(`${endpoint}/api/v1/users/`, data);
  localStorage.setItem("token", (await newUser).data.auth_token);
  return newUser;
}

//Get user using login credintials
export async function login(data: any){
  const login = axios.post(`${endpoint}/api/v1/token/login`,data);
  localStorage.setItem("token", (await login).data.auth_token);
  return login;
}

//Get user using token
export async function getUser(token: string) {
  const getUser = axios.get(`${endpoint}/api/v1/users/me`,{ headers: { Authorization: `Token ${token}` } }); 
  localStorage.setItem("username", (await getUser).data.username);

  const getUserId = axios.get(`${endpoint}/id`,{ headers: { Authorization: `Token ${token}` } });
  localStorage.setItem('userId',(await getUserId).data.results[0].id);
}

//Update user
//Delete user
