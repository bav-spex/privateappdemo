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
    marginTop: 0,
    paddingTop: 0,
    height: 500,
    titleTextStyle: {
      fontSize: 16,
      textAlign: "center",
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '0px',
      marginBottom: '0px',
      // bold: true,
    },
  };
  
   
  return (
    <>
    {/* <h4 style={{textAlign: 'center', marginBottom : '0px', paddingBottom: '0px'}}>Open Risks</h4> */}
        <Chart
            chartType="PieChart"
            data={data3}
            options={options}
            />
    </>
  )
}

export default Google_Chart
