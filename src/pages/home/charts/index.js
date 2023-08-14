import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import styles from '../../../../styles/charts.module.css'
import Doughnut_Chart from './doughnut_chart'
import Google_Chart from './google_chart'
import Line_Chart from './line_chart'
import Speedometer from './speedometer'

ChartJS.register(ArcElement, Tooltip, Legend)

const BatchList = () => {
  // ** State

  return (
    <>
      <div>
        {/* <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '50%'}}>
        <Pie data={data} />
        </div>
        <div style={{width: '50%'}}>
    <Chart
      data={data1}
    >
      <PieSeries valueField="value" argumentField="argument" />
      <Title text="Studies per day"/>
    </Chart>
        </div>
        </div> */}
        <div className={styles.row}>
          <div className={styles.chart_div}>
            <Speedometer />
          </div>
          <div className={styles.chart_div}>
            <Google_Chart />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.chart_div}>
            <Doughnut_Chart />
          </div>
          <div className={styles.chart_div}>
            <Line_Chart />
          </div>
        </div>
      </div>
    </>
  )
}

export default BatchList
