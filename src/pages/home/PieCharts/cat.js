import React, { useCallback, useState } from 'react'

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

const Category = () => {
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 }
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: 'red', height: '38px' }} />
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

export default Category
