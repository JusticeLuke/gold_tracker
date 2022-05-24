const websiteUrl = window.location.href;
const endpoint = websiteUrl.includes("witty-cliff")
  ? "https://goldtracker.azurewebsites.net"
  : "http://localhost:8000";

export async function createLog(data: any) {
  try {
    let token = localStorage.getItem("token");
    let partyId = localStorage.getItem("partyId");
    const res = await fetch(`${endpoint}/party/${partyId}/log`, {
      method: "POST",
      headers: {
        Accept: "application/json; indent=4",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
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
