// ** React Imports
import { useState, useEffect, useCallback } from 'react'

import Chart from "react-google-charts";
import authConfig from 'src/configs/auth'




const Google_Chart = () => {
  // ** State

   const data3 = [
    ["Risk", "Priority"],
    ["High", 10],
    ["Medium", 18],
    ["Low", 8],
    ["Well", 8]
  ];

  const [risks, set_risks]= useState([]);

    const fetch_risks = async()=>{

        const res= await fetch(`${authConfig.open_risk}`, {
            method:"GET",
              headers:{
                  "Content-Type": "application/json"
              },
        })
        const data= await res.json();

        const array_data = Object.entries(data.data).map(([label, value]) => [label, value]);
        array_data.unshift(["Risk", "Priority"]);
        set_risks(array_data);
        // set_risks(data.data);

      }

    useEffect(() => {
        
        fetch_risks();
      }, [])
  
 const options = {
    title: "Open Risks",
    sliceVisibilityThreshold: 0.01, // 20%
    backgroundColor: "transparent",
    height: 450,
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
            data={risks}
            options={options}
            />
    </>
  )
}

export default Google_Chart
