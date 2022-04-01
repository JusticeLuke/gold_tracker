import React from "react";
import { Query, useQuery } from "react-query";

export function Users() {
  let { data, isLoading, error } = useQuery("users", () => {
    return fetch("http://localhost:8000/users", {
      headers: { authorization: "Basic " + window.btoa("admin:Sonic2306") },
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
  return null;
}

function DataFormat(props: any) {
  let username = props.userData.results[0].username;
  return <p>USERNAME: {username} </p>;
}
