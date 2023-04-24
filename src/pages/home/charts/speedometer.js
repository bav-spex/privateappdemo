import ReactSpeedometer from "react-d3-speedometer"
// and just use it


const Speedometer = ()=>{

    return(
        <>
            <ReactSpeedometer
                maxValue={500}
                value={473}
                needleColor="red"
                startColor="green"
                segments={10}
                endColor="blue"
                />
        </>
    );
}

export default Speedometer