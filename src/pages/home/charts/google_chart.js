// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports

import Chart from "react-google-charts";



const Google_Chart = () => {
  // ** State

  

   const data3 = [
    ["Pizza", "Popularity"],
    ["Pepperoni", 33],
    ["Hawaiian", 26],
    ["Mushroom", 22],
    ["Sausage", 10], // Below limit.
    ["Anchovies", 9], // Below limit.
  ];
  
 const options = {
    title: "Popularity of Types of Pizza",
    sliceVisibilityThreshold: 0.2, // 20%
    backgroundColor: "transparent",
  };
  
   

  return (
    <>
        <Chart
            chartType="PieChart"
            data={data3}
            options={options}
            width={"100%"}
            height={"400px"}
            />
    </>
  )
}

export default Google_Chart
