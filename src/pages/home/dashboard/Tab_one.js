import React from 'react'
import Speedometer from '../charts/speedometer'
import Policies from './Policies'
import Tests from './Tests'
import Tasks from './Tasks'
import { useRouter } from 'next/router'
import styles from '../../../../styles/dashboard.module.css'

const Tab_one = (props) => {

  const router = useRouter()
  return (
    
    <>
        <div style={{display: 'flex', justifyContent: 'space-between'}} className={styles.row}>
        <div onClick={()=> {router.push(({
          pathname: `/home/Document`,
          query: { keyword: props.framework_id },
          })
          )}}>
            <Policies />
        </div>
        <div onClick={()=> {router.push(
          ({
          pathname: `/home/complaince/test`,
          query: { keyword: props.framework_id },
          })
          )}}>
            <Tests />
        </div>
        <div onClick={()=> {router.push(
          ({
          pathname: `/home/risk`,
          query: { keyword: props.framework_id },
          })
          )}}>
            <Tasks />
        </div>
        </div>
    </>
  )
}

export default Tab_one