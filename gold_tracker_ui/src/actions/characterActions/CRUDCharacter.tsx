import axios from "axios";

const websiteUrl = window.location.href;
const endpoint = websiteUrl.includes("witty-cliff")
  ? "https://goldtracker.azurewebsites.net"
  : "http://localhost:8000";

export interface Character {
  id?: number;
  name: string;
  personal_gold: string;
  personal_silver: string;
  personal_copper: string;
  party_id: string | null;
}

//Creates a new character and returns the json response
export async function createCharacter(data: Character) {
  let token = localStorage.getItem("token");
  let partyId = localStorage.getItem("partyId");
  let createCharacter = axios.post(`${endpoint}/partys/${partyId}/characters`, data,{headers: {
    Authorization: `Token ${token}`
  }})
  
  return createCharacter;
}

//Gets all characters belonging to party
export async function getPartyCharacters() {
  let token = localStorage.getItem("token");
  let partyId = localStorage.getItem("partyId");
  let partyCharacters = await axios.get(`${endpoint}/partys/${partyId}/characters`,{ 
    headers: { Authorization: `Token ${token}` } });
  let allPartyCharacters: Character[] = partyCharacters.data.results;
  
  while(partyCharacters.data.next){
    partyCharacters = await axios.get(partyCharacters.data.next,{ headers: { Authorization: `Token ${token}` } });
    allPartyCharacters = [...allPartyCharacters, ...partyCharacters.data.results];
  }
  return allPartyCharacters;
}

//Returns character matching id
export async function getCharacter(characterId: number) {
  let token = localStorage.getItem("token");
  let partyId = localStorage.getItem("partyId");
  let character = await axios.get(`${endpoint}/partys/${partyId}/characters/${characterId}`,{ 
    headers: { Authorization: `Token ${token}` } });
  
  return character;
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
    let token = localStorage.getItem("token");
    let partyId = localStorage.getItem("partyId");
    let deleteCharacter = axios.delete(`${endpoint}/partys/${partyId}/characters/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      }
    });
    return deleteCharacter;
}
