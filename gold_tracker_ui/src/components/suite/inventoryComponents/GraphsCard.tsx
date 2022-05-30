import * as React from "react";
import BasicCard from "../../common/basicCard/BasicCard";
import Link from "@mui/material/Link";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { PieChart, Pie} from "recharts";
import { BarChart, Bar, Legend} from "recharts";
import { Typography } from "@mui/material";
import Tooltip from "recharts";

const GraphsCard = (logData: any) => {
  const [graph, setGraph] = React.useState("line");
  const [characters, setCharacters] = React.useState<string | null>();
  
  React.useEffect(() => {
    // Runs after the first render() lifecycle
    setCharacters(localStorage.getItem("characters"));
  }, []);

  const getData = () => {
    let characterData = [];
    if (characters != null) {
      characterData = JSON.parse(characters);
    }
    return characterData;
  };
  const getWealth = (row: any, personal: boolean) => {
    let gold =0;
    let silver=0;
    let copper=0;
    console.log(row);
    if(row.gold && personal === false){
      gold= Number(row.gold);
      silver= Number(row.silver)/10;
      copper= Number(row.copper)/100;
    }else if(row.tribute_gold && personal === false){
      gold= Number(row.tribute_gold);
      silver= Number(row.tribute_silver)/10;
      copper= Number(row.tribute_copper)/100; 
    }else if(row.personal_gold && personal === true){
      gold= Number(row.personal_gold);
      silver= Number(row.personal_silver)/10;
      copper= Number(row.personal_copper)/100; 
    }
    return gold+silver+copper;
  }

  const renderPieChart = () => {
    let data: any[] = [];
    const characters = getData();
    characters.map((row: any) =>{
      data.push({name: row.name, wealth: getWealth(row, false)})
      return null;
    });
    //Get last update of party wealth and add to the dataset
    let lastUpdateIndex = logData.logData.length-1;
    while(lastUpdateIndex >= 0){
      let type = logData.logData[lastUpdateIndex].entry.toLowerCase();
      if(type.includes("party")){
        break;
      }else{
        lastUpdateIndex--;
      }
    } 
    data.push({name:"Party", wealth: getWealth(logData.logData[lastUpdateIndex],false)})
    let renderLabel = (entry: any) => {
      return `${entry.name} (${entry.wealth}g)`;
  }
    return (
    <PieChart width={730} height={250}>
      <Pie data={data} dataKey="wealth" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label={renderLabel} />
    </PieChart>
    );
  }

  const renderBarChart = () => {
    let data: any[] = [];
    const characters = getData();
    characters.map((row: any) =>{
      data.push({name: row.name, personal:getWealth(row,true), contributions: getWealth(row,false)})
      return null;
    });    
  
    return (
      <BarChart width={500} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Legend />
      <Bar dataKey="contributions" fill="#8884d8" />
      <Bar dataKey="personal" fill="#82ca9d" />
    </BarChart>
    );
  }

  //Formats logData for line graph
  const renderLineChart = () => {
    let data: any[] = [];
    logData.logData.map((row: any) =>{
    let type = row.entry.toLowerCase();
    if(type.includes("party")){
      data.push({wealth: getWealth(row, false)})
    }
    return null;
    });  

    return (
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="wealth" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis />
        <YAxis />
      </LineChart>
      )
  };

  const getContent = () => {
    if(graph === "line"){
      return renderLineChart();
    }else if(graph === "bar"){
      return renderBarChart();
    }else if(graph === "pie"){
      return renderPieChart();
    }
   
  };

  const getHeader = () => {
      return (<Typography ><Link onClick={()=>{setGraph("line")}}>Party Gold Over Time</Link> || <Link onClick={()=>{setGraph("pie");setCharacters(localStorage.getItem("characters"));}}>Party Pie Chart</Link> || <Link onClick={()=>{setGraph("bar");setCharacters(localStorage.getItem("characters"));}}>Party Bar Chart</Link></Typography>);
  }
  return (
      <BasicCard
        content={getContent()}
        header={getHeader()}
      />
  );
};
export default GraphsCard;
