const websiteUrl = window.location.href;
const endpoint = websiteUrl.includes("witty-cliff")
  ? "https://goldtracker.azurewebsites.net"
  : "http://localhost:8000";

//Return
export async function predictHP(data: any) {
  try {
    let token = localStorage.getItem("token");
    const res = await fetch(`${endpoint}/predict`, {
      method: "POST",
      headers: {
        Accept: "application/json; indent=4",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    });
    const hpJson = await res.json();
    return hpJson;
  } catch (error) {
    console.log(error);
    //return error component;
  }
}
