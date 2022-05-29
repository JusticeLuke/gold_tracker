import * as React from "react";
import BasicCard from "../../common/basicCard/BasicCard";
import Grid from "@mui/material/Grid";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const GraphsCard = () => {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 500, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 700, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 550, pv: 2400, amt: 2400 },
  ];

  const renderLineChart = (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  );

  const getContent = () => {
    return renderLineChart;
  };
  return (
    <Grid item xs={8}>
      <BasicCard
        content={getContent()}
        header={"Line Graph || Bar Graph || Pie Graph"}
      />
    </Grid>
  );
};
export default GraphsCard;
