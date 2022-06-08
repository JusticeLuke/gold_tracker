const websiteUrl = window.location.href;
const endpoint = websiteUrl.includes("witty-cliff")
  ? "https://goldtracker.azurewebsites.net"
  : "http://localhost:8000";

//Creates a new character and returns the json response
export async function createCharacter(data: any) {
  try {
    let token = localStorage.getItem("token");
    let partyId = localStorage.getItem("partyId");
    const res = await fetch(`${endpoint}/partys/${partyId}/characters`, {
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
    const characterJson = await res.json();
    return characterJson;
  } catch (error) {
    console.log(error);
    return false;
  }
}

//Gets all characters belonging to party
export async function getPartyCharacters() {
  try {
    let partyCharactersArray = [];
    let token = localStorage.getItem("token");
    let partyId = localStorage.getItem("partyId");
    const partyCharactersRes = await fetch(
      `${endpoint}/partys/${partyId}/characters`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    //Gets json response and pushes results into the party array.
    let partyCharactersJson = await partyCharactersRes.json();
    let pageNum = 2;
    for (let x = 0; x < partyCharactersJson.results.length; x++) {
      partyCharactersArray.push(partyCharactersJson.results[x]);
    }
    //If the response has a next page, requests the next page and
    //pushes response results into the party array
    while (partyCharactersJson.next) {
      let nextPageRes = await fetch(`${endpoint}/user-partys?page=${pageNum}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      partyCharactersJson = await nextPageRes.json();
      pageNum++;
      for (let x = 0; x < partyCharactersJson.results.length; x++) {
        partyCharactersArray.push(partyCharactersJson.results[x]);
      }
    }
    //Save party array as a string in local storage, and return the json response
    localStorage.setItem("characters", JSON.stringify(partyCharactersArray));
    return partyCharactersJson;
  } catch (error) {
    console.log(error);
    //return error component
  }
}

//Returns character matching id
export async function getCharacter(id: number) {
  try {
    let token = localStorage.getItem("token");
    let partyId = localStorage.getItem("partyId");
    const res = await fetch(`${endpoint}/partys/${partyId}/characters/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json; indent=4",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (res.statusText !== "Created") {
      throw new Error("Something went wrong.");
    }
    const characterJson = res.json();
    return characterJson;
  } catch (error) {
    console.log(error);
    return false;
  }
}

//Updates character with the provided values. 
//Character id is passed with data
export async function updateCharacter(data: any) {
  try {
    let token = localStorage.getItem("token");
    let partyId = localStorage.getItem("partyId");
    const res = await fetch(`${endpoint}/partys/${partyId}/characters/${data.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json; indent=4",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    });
    const characterJson = res.json();
    return characterJson;
  } catch (error) {
    console.log(error);
    //return error component;
  }
}

//Deletes character matching id. Returns true/false
export async function deleteCharacter(id: number) {
  try {
    let token = localStorage.getItem("token");
    let partyId = localStorage.getItem("partyId");
    await fetch(`${endpoint}/partys/${partyId}/characters/${id}`, {
      method: "DELETE",
      headers: {
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
