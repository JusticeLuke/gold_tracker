const websiteUrl = window.location.href;
const endpoint = websiteUrl.includes("witty-cliff")
  ? "https://goldtracker.azurewebsites.net"
  : "http://localhost:8000";

//Get users partys
export async function getPartys() {
  try {
    let partysArray = [];
    let token = localStorage.getItem("token");
    const partysRes = await fetch(`${endpoint}/user-partys`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    let partysJson = await partysRes.json();
    let pageNum = 2;
    for (let x = 0; x < partysJson.results.length; x++) {
      partysArray.push(partysJson.results[x]);
    }
    while (partysJson.next) {
      let nextPageRes = await fetch(`${endpoint}/user-partys?page=${pageNum}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      partysJson = await nextPageRes.json();
      pageNum++;
      for (let x = 0; x < partysJson.results.length; x++) {
        partysArray.push(partysJson.results[x]);
      }
    }

    localStorage.setItem("partys", JSON.stringify(partysArray));
    return partysJson;
  } catch (error) {
    console.log(error);
  }
}

//Create new party
export async function createParty(data: any) {
  try {
    let token = localStorage.getItem("token");
    const res = await fetch(`${endpoint}/partys`, {
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

export async function deleteParty() {
  try {
    let token = localStorage.getItem("token");
    let partyId = localStorage.getItem("partyId");
    await fetch(`${endpoint}/partys/${partyId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json; indent=4",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateParty(data: any) {
  try {
    let token = localStorage.getItem("token");
    let partyId = localStorage.getItem("partyId");
    await fetch(`${endpoint}/partys/${partyId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json; indent=4",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
