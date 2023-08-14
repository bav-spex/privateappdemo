import React from 'react'

import { Chart } from 'react-google-charts'

const data = [
  ['Complaince', 'Total Findings', 'Open Findings'],
  ['Hippa', 1000, 400],
  ['Cloud Security', 1170, 460],
  ['PCI', 1120, 660],
  ['ISO 27001', 1030, 540]
]

const options = {
  title: 'Current Audit Status',
  curveType: 'function',
  legend: { position: 'bottom' },
  backgroundColor: 'transparent',
  height: 350,
  titleTextStyle: {
    fontSize: 16,
    textAlign: 'center'
    // bold: true,
  }
}

const Line_Chart = () => {
  return (
    <Chart
      chartType='BarChart'
      width='100%'
      // height="400px"
      data={data}
      options={options}
    />
  )
}

export default Line_Chart
