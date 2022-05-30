const websiteUrl = window.location.href;
const endpoint = websiteUrl.includes("witty-cliff")
  ? "https://goldtracker.azurewebsites.net"
  : "http://localhost:8000";

export async function createLog(data: any) {
  try {
    let token = localStorage.getItem("token");
    const res = await fetch(`${endpoint}/partys/${data.party_id}/log`, {
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

export async function getLog() {
  try {
    let logArray = [];
    let token = localStorage.getItem("token");
    let partyId = localStorage.getItem("partyId");
    const logRes = await fetch(`${endpoint}/partys/${partyId}/log`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    let logJson = await logRes.json();
    let pageNum = 2;
    for (let x = 0; x < logJson.results.length; x++) {
      logArray.push(logJson.results[x]);
    }
    while (logJson.next) {
      let nextLogRes = await fetch(
        `${endpoint}/partys/${partyId}/log?page=${pageNum}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      logJson = await nextLogRes.json();
      pageNum++;
      for (let x = 0; x < logJson.results.length; x++) {
        logArray.push(logJson.results[x]);
      }
    }

    localStorage.setItem("log", JSON.stringify(logArray));
    return logJson;
  } catch (error) {
    console.log(error);
  }
}
