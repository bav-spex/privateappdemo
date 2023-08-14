import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
      {/* {data[index].name}-{data[index].value} */}
      {/* {data[index.value]} */}
    </text>
  )
}

const PieCharts = () => {
  const [status, setStaus] = useState([])

  // useEffect(() => {
  //   const getStatus = []
  //   const getRisk = async () => {
  //     const reqData = await fetch('https://9d9560c9-7f96-4865-9747-d5a8232c9a70.mock.pstmn.io//rmf/v1/risks')
  //     const resData = await reqData.json()
  //     console.log(resData)
  //     // for (let i = 0; i < resData.length - 1; i) {
  //     //
  //     // getStatus.push(resData[i].status)
  //     // }
  //     setStaus(getRisk)
  //   }
  //   getRisk()
  // }, [status])
  const getRisk = async () => {
    const reqData = await fetch('https://9d9560c9-7f96-4865-9747-d5a8232c9a70.mock.pstmn.io//rmf/v1/risks')
    const resData = await reqData.json()
    console.log(resData)
    // for (let i = 0; i < resData.length - 1; i) {
    //
    // getStatus.push(resData[i].status)
    // }
    setStaus(resData)
  }

  useEffect(() => {
    const getStatus = []

    getRisk()
  }, [])

  const data = [
    { name: 'Active', value: 1 },
    { name: 'Inactive', value: 0 }
  ]

  return (
    <>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={97}
          cy={80}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
        >
          {data?.risk?.status.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Box
        style={{ padding: 5, margin: 'auto' }}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <span style={{ display: 'inline-block', width: 10, height: 10, backgroundColor: COLORS[0] }}></span> Active
        <span style={{ display: 'inline-block', width: 10, height: 10, backgroundColor: COLORS[1] }}></span> Inactive
        <span style={{ display: 'inline-block', width: 10, height: 10, backgroundColor: COLORS[2] }}></span> delete
      </Box>
    </>
  )
}

export default PieCharts
