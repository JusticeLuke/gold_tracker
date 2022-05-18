const websiteUrl = window.location.href;
const endpoint = websiteUrl.includes("witty-cliff")
  ? "https://goldtracker.azurewebsites.net"
  : "http://localhost:8000";

//Get users partys
export async function getPartys(token: any) {
  try {
    let token = localStorage.getItem("token");
    const partysRes = await fetch(`${endpoint}/user-partys`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    const partysJson = await partysRes.json();
    return partysJson;
  } catch (error) {
    console.log(error);
  }
}
