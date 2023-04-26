// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports

import Chart from "react-google-charts";



const Google_Chart = () => {
  // ** State

  

   const data3 = [
    ["Risk", "Priority"],
    ["High", 10],
    ["Medium", 18],
    ["Low", 8]
  ];
  
 const options = {
    title: "Open Risks",
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
