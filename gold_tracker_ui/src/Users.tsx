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
      <h1>USERS</h1>
      {isLoading ? "loading..." : null}
      {error ? "Error" : null}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : null}
    </div>
  );
  return null;
}
