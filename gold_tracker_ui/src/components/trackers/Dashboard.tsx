import React, { Fragment } from "react";
import { Form } from "./Form";
import { Trackers } from "./Trackers";

export function Dashboard() {
  return (
    <Fragment>
      <Form />
      <Trackers />
    </Fragment>
  );
}
