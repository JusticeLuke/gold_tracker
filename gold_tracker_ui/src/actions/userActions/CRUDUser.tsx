const websiteUrl = window.location.href;
const endpoint = websiteUrl.includes("witty-cliff")
  ? "https://goldtracker.azurewebsites.net"
  : "http://localhost:8000";

//Create a new user, and returns json of response
export async function createUser(data: any) {
  try {
    const res = await fetch(`${endpoint}/api/v1/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.statusText !== "Created") {
      throw new Error("Something went wrong.");
    }
    const userJson = await res.json();
    console.log("Create user res: "+JSON.stringify(userJson));
    return userJson;
  } catch (error) {
    console.log(error);
    //return error component;
  }
}

//Get user using login credintials
export async function login(data: any) {
  try {
    const res = await fetch(`${endpoint}/api/v1/token/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 400 || res.status === 401) {
      throw new Error("username or password do not match our records");
    }
    const json = await res.json();
    localStorage.setItem("token", json.auth_token);
    //Get user using token set in localStorage
    const userJson = await getUser(localStorage.getItem("token"));
    console.log("login res: " + JSON.stringify(userJson));
    return userJson;
  } catch (error) {
    console.log(error);
  }
}

//Get user using token
export async function getUser(token: any) {
  try {
    //Get username
    const userRes = await fetch(`${endpoint}/api/v1/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    const userJson = await userRes.json();
    localStorage.setItem("username", userJson.username);
    //Get user id <- I dont understand why I make a serperate request to get id
    const idRes = await fetch(`${endpoint}/id`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    const idJson = await idRes.json();
    console.log("getUser red: " + JSON.stringify(idJson));
    localStorage.setItem("id", idJson.results[0].id);
    return userJson;
  } catch (error) {
    console.log(error);
  }
}

//Update user
//Delete user
