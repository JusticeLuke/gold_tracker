import axios from "axios";
import {createLog} from "../logActions/CRLog";

//Reads the current url field, and sets endpoint to the production server
//or the local host
const websiteUrl = window.location.href;
const endpoint = websiteUrl.includes("witty-cliff")
  ? "https://goldtracker.azurewebsites.net"
  : "http://localhost:8000";

export interface Party{
  partyId?: string | null;
  name: string | null;
  anon_gold: number;
  anon_silver: number;
  anon_copper: number;
  user_id: string | null;
}

//Returns all of one user's partys, and saves them to local storage
export async function getPartys(token: string | null) {
  let partys = await axios.get(`${endpoint}/user-partys`,{ headers: { Authorization: `Token ${token}` } });
  let allPartys: Party[] = partys.data.results;
  
  while(partys.data.next){
    partys = await axios.get(partys.data.next,{ headers: { Authorization: `Token ${token}` } });
    allPartys = [...allPartys, ...partys.data.results];
  }
  return allPartys;
}

//Creates a new party, returns json o response and a log entry based on the wealth data
export async function createParty(data: Party) {
  let createParty = axios.post(`${endpoint}/partys`, data, {headers: {
    Authorization: `Token ${localStorage.getItem('token')}`,}
    });
    console.log(createParty);
    //Populates party's log with starting wealth values
    await createLog({
      name:"Party wealth update",
      gold:data.anon_gold, 
      silver:data.anon_silver, 
      copper:data.anon_copper, 
      entry:`Intial party wealth: ${data.anon_gold}g ${data.anon_silver}s ${data.anon_copper}c `, 
      party_id:(await createParty).data.id
    });  

    return createParty;
}

//Deletes party, returns true or false if the request suceeds.
export async function deleteParty(partyId: string | null) {
  if(partyId){
    let deleteParty = axios.delete(`${endpoint}/partys/${partyId}`, {headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }});
    return deleteParty;
  }else{
    console.log("Error: Party Id has been lost.");
  }
}

//Updates party with given values, and calls createLog to record changes
export async function updateParty(partyId: string | null, data: Party) {
  let updateParty = axios.put(`${endpoint}/partys/${partyId}`, data, {
    headers:{
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  });
  
    
    //Create log entry to record changes to party gold
    await createLog({name:"Party wealth update",
    gold:data.anon_gold, silver:data.anon_silver, copper:data.anon_copper, 
    entry:`New party wealth is ${data.anon_gold}g ${data.anon_silver}s ${data.anon_copper}c `, 
    party_id:partyId});

    return updateParty;
}
