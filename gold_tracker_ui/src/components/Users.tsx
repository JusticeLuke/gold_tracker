import React from "react";
import { useQuery } from "react-query";

export function Users() {
  let user = "admin";
  let pass = "sonic2306";
  let env_url = "http://localhost:8000/";

  if (window.location.href.includes("goldtracker.azurewebsites")) {
    env_url = "https://goldtracker.azurewebsites.net/";
  }
  let { data, isLoading, error } = useQuery("partys", () => {
    return fetch(env_url + "partys", {
      headers: { authorization: "Basic" + window.btoa(user + ":" + pass) },
    }).then((response) => response.json());
  });

  return (
    <div>
      <h1>USER</h1>
      {isLoading ? "loading..." : null}
      {error ? "Error" : null}
      {data ? <DataFormat userData={data} /> : null}
    </div>
  );
}

function DataFormat(props: any) {
  let username = props.userData.results[0].name;
  return <p>Your party name is {username} </p>;
}
