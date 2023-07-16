// ** React Imports
import { useState, useEffect, useCallback } from 'react'

import Chart from 'react-google-charts'
import authConfig from 'src/configs/auth'
import styles from '../../../../styles/pie_chart.module.css'

const Google_Chart = () => {
  // ** State
  const [risks, set_risks] = useState([])

  const fetch_risks = async () => {
    const res = await fetch(`${authConfig.open_risk}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()

    const array_data = Object.entries(data.data).map(([label, value]) => [label, value])
    console.log(array_data)
    array_data.unshift(['Risk', 'Priority'])
    set_risks(array_data)
    // set_risks(data.data);
  }

  useEffect(() => {
    fetch_risks()
  }, [])

  const options = {
    chartArea: { left: '20%' },
    legend: { position: 'bottom' },
    title: 'Open Risks',
    sliceVisibilityThreshold: 0.01, // 20%
    backgroundColor: 'transparent',
    height: 350,
    titleTextStyle: {
      fontSize: 20,
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '0px',
      marginBottom: '0px',
      bold: true
    }
  }

  return (
    <>
      {/* <h4 style={{textAlign: 'center', marginBottom : '0px', paddingBottom: '0px'}}>Open Risks</h4> */}
      <div className={styles.chart_container}>
        <Chart chartType='PieChart' data={risks} options={options} />
      </div>
    </>
  )
}

export default Google_Chart
