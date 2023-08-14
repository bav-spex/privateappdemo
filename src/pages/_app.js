import { CacheProvider } from '@emotion/react'
import { zhCN } from '@mui/material/locale'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import NProgress from 'nprogress'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import AclGuard from 'src/@core/components/auth/AclGuard'
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import GuestGuard from 'src/@core/components/auth/GuestGuard'
import Spinner from 'src/@core/components/spinner'
import WindowWrapper from 'src/@core/components/window-wrapper'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import { defaultACLObj } from 'src/configs/acl'
import themeConfig from 'src/configs/themeConfig'
import { AuthProvider } from 'src/context/AuthContext'
import UserLayout from 'src/layouts/UserLayout'
// eslint-disable-next-line import/order
import { store } from 'src/store'
// ** Fake-DB Import
import 'src/@fake-db'
// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' }
    }
  },
  zhCN
)

const clientSideEmotionCache = createEmotionCache()

const Guard = ({ children, authGuard, guestGuard }) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false

  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined
  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false
  const aclAbilities = Component.acl ?? defaultACLObj

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <>
            <Head>
              <title>{`${themeConfig.templateName}`}</title>
              <meta name='description' content={`${themeConfig.templateName}`} />
              <meta name='keywords' content='Rakshitah' />
              <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>

            <WindowWrapper>
              <AuthProvider>
                <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
                  <SettingsConsumer>
                    {({ settings }) => {
                      return (
                        <ThemeComponent settings={settings}>
                          <Guard authGuard={authGuard} guestGuard={guestGuard}>
                            <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
                              {getLayout(<Component {...pageProps} />)}
                            </AclGuard>
                          </Guard>
                          <ReactHotToast>
                            <Toaster
                              position={settings.toastPosition}
                              toastOptions={{ className: 'react-hot-toast' }}
                            />
                          </ReactHotToast>
                        </ThemeComponent>
                      )
                    }}
                  </SettingsConsumer>
                </SettingsProvider>
              </AuthProvider>
            </WindowWrapper>
          </>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}

export default App
