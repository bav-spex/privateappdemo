import { Button } from '@mui/material';
import React from 'react'
import { Chart } from "react-google-charts";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab_one from './Tab_one';
import styles from '../../../../styles/charts.module.css'
import Google_Chart from '../charts/google_chart'
import Line_Chart from '../charts/line_chart'
import Doughnut_Chart from '../charts/doughnut_chart'
import { useRouter } from 'next/router'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent'
import Icon from '@mui/material/Icon'
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'

import ToggleButton from '@mui/material/ToggleButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'


function TabPanel(props) {
    const { children, value, index, ...other } = props;    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

const Dashboard = () => {

    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const options = {
        chart: {
        //   title: "Critical Issues",
          
        },
      };

      const tabs= [{id:"23",framework_name:"Hippa"} ,{id:"24",framework_name:"Cloud Security"},{id:"25",framework_name:"PCI"}];

      const router = useRouter()
  return (
    <>
        <div>
        <div style={{marginBottom: '2vh', width: '24%', float: 'right', height: '720px' , padding: '10px'}}>
        {/* <div className={styles.row}> */}
         {/* <div className={styles.action_div}> */}
         <Card sx={{ width: '100%',marginBottom: '2vh' , height: '28%', backgroundColor: '#98BDFF' }}>
              <CardMedia
                component="img"
                height="150"                
                image="/images/todo-icon.jpg"
                alt="Action Items"
              />
              <Typography variant="h5" align='center' component="div" gutterBottom >
                To Do
                </Typography>              
          </Card>          
            <Card sx={{ width: '100%',marginBottom: '2vh', height: '23%', backgroundColor: '#98BDFF' }}>
              <CardContent>                
                <Typography variant="h5" align='left' component="div">
                  Governance
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Pending Apporval
                </Typography>
                <Typography variant="body2">
                  7 policies are pending for appoval
                </Typography>
              </CardContent>
            <CardActions>
              <Button sx={{ color: 'white' }} size="small" onClick={()=> {router.push(({
          pathname: `/home/Document`          
          })
          )}} >Approve</Button>
            </CardActions>
          </Card>
          <Card sx={{ width: '100%' ,marginBottom: '2vh' , height: '23%' , backgroundColor: '#98BDFF' }}>                     
              <CardContent>               
                <Typography variant="h5" align='left' component="div">
                  Risk
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Pending Mitigation/Review
                </Typography>
                <Typography variant="body2">
                 10  with no mitigations/5 for review
                </Typography>
              </CardContent>
            <CardActions>
              <Button sx={{ color: 'white' }} size="small" onClick={()=> {router.push(({
          pathname: `/home/risk`
          })
          )}}>Mitigate/Review</Button>
            </CardActions>
          </Card>
          <Card sx={{ width: '100%' ,marginBottom: '2vh', height: '23%' , backgroundColor: '#98BDFF'}}>                     
              <CardContent>               
                <Typography variant="h5" align='left' component="div">
                 Complaince
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Pending Audit Findings
                </Typography>
                <Typography variant="body2">
                  56 audit findings are open
                </Typography>
              </CardContent>
            <CardActions>
              <Button sx={{ color: 'white' }} size="small" onClick={()=> {router.push(({
          pathname: `/home/complaince/test`          
          })
          )}} >Close Findings</Button>
            </CardActions>
          </Card>
         </div>
        {/* </div> */}
        {/* </div> */}
            <div style={{marginBottom: '2vh',  width: '75%', padding: '10px'}}>
            {/* <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3>Critical issues</h3>
            <Button variant='contained'>View All</Button>
            </div>
            <Chart
                chartType="Line"
                width="100%"
                height="350px"
                data={data}
                options={options}
                /> */}
                <div className={styles.row}>
                  <div className={styles.chart_div1} onClick={()=> {router.push(({
          pathname: `/home/risk`          
          })
          )}}>
                  <Google_Chart />
                  </div>
                  <div className={styles.chart_div2}>
                  <Doughnut_Chart />
                  </div>
                  <div className={styles.chart_div3}>
                  <Line_Chart />
                  </div>                 
                  </div>
            </div>
            
            <div style={{ width: '75%', padding: '10px'}}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {tabs.map((item, index) => (
                      <Tab label={item.framework_name} {...a11yProps(index)} />
                    ))}
                    {/* <Tab label="ISO270012022" {...a11yProps(0)} />
                    <Tab label="ISO27001" {...a11yProps(1)} />
                    <Tab label="SOC2" {...a11yProps(2)} /> */}
                    </Tabs>
                </Box>
                {tabs.map((item, index) => (
                <TabPanel value={value} index={index}>
                    <Tab_one framework_id={item.id}/>
                </TabPanel>
                ))}
                </Box>
            </div>
        </div>
    </>
  )
}

export default Dashboard