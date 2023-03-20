import { styled, useTheme } from '@mui/material/styles'

export const Image = (srcImage, altText) => {
  const theme = useTheme()

  const Img = styled('img')(({ theme }) => ({
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down('lg')]: {
      width: 30,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      width: 30
    },
    [theme.breakpoints.up('lg')]: {
      width: 50,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  }))

  return <Img alt={altText} src={srcImage} />
}
