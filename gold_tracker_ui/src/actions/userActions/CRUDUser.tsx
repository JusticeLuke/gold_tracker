const websiteUrl = window.location.href;
const endpoint = websiteUrl.includes("witty-cliff")
  ? "https://goldtracker.azurewebsites.net"
  : "http://localhost:8000";

//Create a new user
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
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
//Get user using login credintials
export async function login(data: any) {
  try {
    console.log(endpoint);
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

    const userJson = getUser(localStorage.getItem("token"));
    return userJson;
  } catch (error) {
    console.log(error);
  }
}

//Get user using token
export async function getUser(token: any) {
  try {
    let token = localStorage.getItem("token");
    const userRes = await fetch(`${endpoint}/api/v1/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    const userJson = await userRes.json();
    localStorage.setItem("username", userJson.username);
    return userJson;
  } catch (error) {
    console.log(error);
  }
}

//Update user
//Delete user
