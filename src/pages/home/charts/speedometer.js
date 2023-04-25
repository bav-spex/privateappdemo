import ReactSpeedometer from "react-d3-speedometer"
import Paper from '@material-ui/core/Paper';
// and just use it


const Speedometer = ()=>{

    return(
        <>
        {/* <Paper style={{padding: 'auto'}}> */}
        <h1 style={{textAlign: 'center'}}>Speedometer</h1>
        <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
            <ReactSpeedometer
                maxValue={10}
                value={5}
                needleColor="black"
                startColor="green"
                segments={10}
                endColor="red"
                />
        </div>
        {/* </Paper> */}
        </>
    );
}

export default Speedometer