import {createLog} from "../logActions/CRLog";

//Reads the current url field, and sets endpoint to the production server
//or the local host
const websiteUrl = window.location.href;
const endpoint = websiteUrl.includes("witty-cliff")
  ? "https://goldtracker.azurewebsites.net"
  : "http://localhost:8000";

//Returns all of one user's partys, and saves them to local storage
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

//Creates a new party, returns json o response and a log entry based on the wealth data
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
    const newParty= await res.json();

    //Populates party's log with starting wealth values
    await createLog({name:"Party wealth update",
    gold:newParty.anon_gold, silver:newParty.anon_silver, copper:newParty.anon_copper, 
    entry:`Party starting wealth is ${newParty.anon_gold}g ${newParty.anon_silver}s ${newParty.anon_copper}c `, 
    party_id:newParty.id})
    return newParty;
  } catch (error) {
    console.log(error);
    //return error component;
  }
}

//Deletes party, returns true or false if the request suceeds.
export async function deleteParty() {
  try {
    let token = localStorage.getItem("token");
    //PartyId should be set by passing a parameter.
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

//Updates party with given values, and calls createLog to record changes
export async function updateParty(data: any) {
  try {
    let token = localStorage.getItem("token");
    let partyId = localStorage.getItem("partyId");
    const res = await fetch(`${endpoint}/partys/${partyId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json; indent=4",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    });
    const newParty= await res.json();
    
    //Create log entry to record changes to party gold
    await createLog({name:"Party wealth update",
    gold:newParty.anon_gold, silver:newParty.anon_silver, copper:newParty.anon_copper, 
    entry:`New party wealth is ${newParty.anon_gold}g ${newParty.anon_silver}s ${newParty.anon_copper}c `, 
    party_id:newParty.id})
    return newParty;
  } catch (error) {
    console.log(error);
    //return error component;
  }
}
