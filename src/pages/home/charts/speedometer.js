// import ReactSpeedometer from "react-d3-speedometer"
import { useEffect, useState } from 'react'

import Paper from '@material-ui/core/Paper'
// and just use it
import dynamic from 'next/dynamic'
import authConfig from 'src/configs/auth'

const ReactSpeedometer = dynamic(() => import('react-d3-speedometer'), { ssr: false })

const Speedometer = () => {
  const [score, set_score] = useState(0)

  const fetch_score = async () => {
    const res = await fetch(`${authConfig.speedometer}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    set_score(data.data.risk_score)
  }

  useEffect(() => {
    fetch_score()
  }, [])

  return (
    <>
      {/* <Paper style={{padding: 'auto'}}> */}
      <h4 style={{ textAlign: 'center', color: 'black' }}>Risk Score</h4>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        <ReactSpeedometer
          maxValue={10}
          value={score}
          needleColor='black'
          startColor='green'
          segments={10}
          endColor='red'
          height={200}
          width={200}
          // title="Speedometer"
        />
      </div>
      {/* </Paper> */}
    </>
  )
}

export default Speedometer
