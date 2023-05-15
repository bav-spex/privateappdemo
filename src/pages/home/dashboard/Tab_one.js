import React from 'react'
import Speedometer from '../charts/speedometer'
import Policies from './Policies'
import Tests from './Tests'
import Tasks from './Tasks'

const Tab_one = () => {
  return (
    
    <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
            <Policies />
        </div>
        <div>
            <Tests />
        </div>
        <div>
            <Tasks />
        </div>
        </div>
    </>
  )
}

export default Tab_one