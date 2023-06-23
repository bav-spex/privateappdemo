import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Risk", "Status"],
  ["Reviewed", 11],
  ["Planned Mitigation", 2],
  ["Pending Review", 2],
  ["Draft ", 2],
  ["Closed", 7], // CSS-style declaration
];

const options = {
  title: "Overall Risk Status",
  legend: {position: 'bottom'},
  pieHole: 0.5, 
  is3D: false,
  backgroundColor: "transparent",
  height: 350,
  titleTextStyle: {
    fontSize: 16,
    textAlign: "center",
    // bold: true,
  },
};

const Doughnut_Chart=()=> {

  return (
    <>
    <Chart
      chartType="PieChart"
      width="100%"
      // height="700px"
      data={data}
      options={options}
    />
    </>
  );
}

export default Doughnut_Chart