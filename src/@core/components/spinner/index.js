// ** MUI Import
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    width: 90,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('md')]: {
    height: 'auto',
    width: 90,
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.up('lg')]: {
    width: 90,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4)
  }
}))

const FallbackSpinner = ({ sx }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <Img alt='loader image' src='/images/apple-touch-icon.png' />
      <CircularProgress disableShrink sx={{ mt: 6, color: '#060056' }} />
    </Box>
  )
}

export default FallbackSpinner
