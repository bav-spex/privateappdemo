// import ReactSpeedometer from "react-d3-speedometer"
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from "react";
// and just use it
import authConfig from 'src/configs/auth'
import dynamic from 'next/dynamic';

const ReactSpeedometer = dynamic(() => import('react-d3-speedometer'),{ ssr: false },);


const Tests = ()=>{

    const [score, set_score]= useState(0);


    const fetch_score = async()=>{

        const res= await fetch(`${authConfig.speedometer}`, {
            method:"GET",
              headers:{
                  "Content-Type": "application/json"
              },
        })
        const data= await res.json();
        set_score(data.data.risk_score);
    }

    useEffect(() => {
        
        fetch_score();
      }, [])

    return(
        <>
        {/* <Paper style={{padding: 'auto'}}> */}
        <h4 style={{textAlign: 'center'}}>Compliance</h4>
        <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
            <ReactSpeedometer
                maxValue={10}
                value={7}
                needleColor="black"
                startColor="red"
                segments={10}
                endColor="green"
                height={160}
                width={250}
                // title="Speedometer"
                />
        </div>
        <p style={{textAlign: 'center', marginTop: '0px'}}>70% findings are closed</p>
        {/* </Paper> */}
        </>
    );
}

export default Tests