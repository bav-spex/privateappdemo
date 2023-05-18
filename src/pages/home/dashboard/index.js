import { Button } from '@mui/material';
import React from 'react'
import { Chart } from "react-google-charts";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab_one from './Tab_one';


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

      const data = [
        [
          "Date",
          "No. of crictical issues"
        ],
        ['10 May', 37.8],
        ['11 May', 30.9],
        ['12 May', 25.4],
        ['13 May', 11.7],
        ['14 May', 11.9],
        ['15 May', 8.8],
        ['16 May', 7.6]
      ];

      const tabs= [{id:"23",framework_name:"F1"} ,{id:"24",framework_name:"F2"},{id:"25",framework_name:"F4"}];


  return (
    <>
        <div>
            <div style={{marginBottom: '5vh', border: '1px solid silver', padding: '10px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3>Critical issues</h3>
            <Button variant='contained'>View All</Button>
            </div>
            <Chart
                chartType="Line"
                width="100%"
                height="350px"
                data={data}
                options={options}
                />
            </div>
            <div style={{border: '1px solid silver', padding: '10px'}}>
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