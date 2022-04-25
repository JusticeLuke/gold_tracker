import React from "react";
import { useQuery } from "react-query";

export function Users() {
  let user = process.env.REACT_APP_DJANGO_USER;
  let pass = process.env.REACT_APP_DJANGO_PASS;
  let env_url = "https://goldtracker.azurewebsites.net/";
  console.log(window.location.href);
  if (window.location.href.includes("localhost")) {
    env_url = "http://localhost:3000/";
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
