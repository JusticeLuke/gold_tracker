import React from "react";
import { useQuery } from "react-query";

export function Users() {
  let { data, isLoading, error } = useQuery("partys", () => {
    return fetch("http://127.0.0.1:8000/partys", {
      headers: { authorization: "Basic" + window.btoa("admin:sonic2306") },
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
