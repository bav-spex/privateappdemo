// // ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// // ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'

// // ** Icon Imports
import Icon from 'src/@core/components/icon'

// // ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// const RiskList = () => {
//   useEffect(() => {
//     allRisk(() => {}, setAll)
//   }, [])

//   const router = useRouter()
//   const [all, setAll] = useState([])

//   const risksArray = all?.data?.risk

//   const columns = [
//     { flex: 0.15, minWidth: 50, field: 'id', headerName: 'ID' },
//     { flex: 0.15, minWidth: 50, field: 'suject', headerName: 'Subject' },
//     { flex: 0.15, minWidth: 50, field: 'inherentscore', headerName: 'Inherent Score' },
//     { flex: 0.15, minWidth: 50, field: 'status', headerName: 'Status', type: 'number', width: 90 },
//     {
//       flex: 0.15,
//       minwidth: 110,
//       filed: 'submissionDate',
//       headerName: 'SubmissionDate',
//       type: 'date',
//       width: 90
//     }
//   ]

//   const rows = []

//   Array.isArray(risksArray) && risksArray.map(r => rows.push(r))

//   const [value, setValue] = useState('')

//   const handleCreateClick = () => {
//     router.push('/home/mitigation/mitigation')
//   }

//   const handleFilter = useCallback(val => {
//     setValue(val)
//   }, [])

//   return (
//     <>
//       <div style={{ height: 400, width: '100%' }}>
//         <CardContent>
//           <Grid container spacing={6}>
//             <Grid item sm={4} xs={12}></Grid>
//             <Grid item sm={8} xs={12} sx={{ display: 'flex', allignItems: 'end', justifyContent: 'end' }}>
//               <Button size='medium' variant='contained' onClick={handleCreateClick}>
//                 Create mitigation
//               </Button>
//             </Grid>
//           </Grid>
//         </CardContent>
//         <Divider />
//         <TableHeader value={value} handleFilter={handleFilter} />
//         <DataGrid rows={rows} columns={columns} pageSize={7} rowsPerPageOptions={[7]} checkboxSelection />
//       </div>
//     </>
//   )
// }
// export default RiskList
