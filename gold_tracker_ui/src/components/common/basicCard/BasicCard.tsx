import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const BasicCard = ({ header, content }: any) => {
  return (
    <Card sx={{ mt: "20px" }}>
      {header}
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default BasicCard;
