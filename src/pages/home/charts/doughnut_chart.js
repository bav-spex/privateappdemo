import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7], // CSS-style declaration
];

const options = {
  title: "My Daily Activities",
  pieHole: 0.5,
  is3D: false,
  backgroundColor: "transparent",
};

const Doughnut_Chart=()=> {

  return (
    <>
    <Chart
      chartType="PieChart"
      width="100%"
      height="500px"
      data={data}
      options={options}
    />
    </>
  );
}

export default Doughnut_Chart