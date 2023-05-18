import React from 'react'
import Speedometer from '../charts/speedometer'
import Policies from './Policies'
import Tests from './Tests'
import Tasks from './Tasks'
import { useRouter } from 'next/router'

const Tab_one = (props) => {

  const router = useRouter()
  return (
    
    <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div onClick={()=> {router.push(({
          pathname: `/home/Document`,
          query: { keyword: props.framework_id },
          })
          )}}>
            <Policies />
        </div>
        <div onClick={()=> {router.push(`/home/complaince/test`)}}>
            <Tests />
        </div>
        <div onClick={()=> {router.push(`/home/risk`)}}>
            <Tasks />
        </div>
        </div>
    </>
  )
}

export default Tab_one