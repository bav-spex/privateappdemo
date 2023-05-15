import ReactSpeedometer from "react-d3-speedometer"
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from "react";
// and just use it
import authConfig from 'src/configs/auth'


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
        <h4 style={{textAlign: 'center', color: 'black'}}>Tests</h4>
        <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
            <ReactSpeedometer
                maxValue={10}
                value={score}
                needleColor="black"
                startColor="green"
                segments={10}
                endColor="blue"
                height={250}
                width={250}
                // title="Speedometer"
                />
        </div>
        <p style={{textAlign: 'center', marginTop: '0px'}}>81 tests are complaint</p>
        {/* </Paper> */}
        </>
    );
}

export default Tests