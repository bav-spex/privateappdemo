// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
import { Router } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'
import themeConfig from 'src/configs/themeConfig'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

export const getHomeRoute = role => {
  if (role === 'client') return '/acl'
  else return '/home/dashboard'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  // ** Pace Loader
  if (themeConfig.routingLoader) {
    Router.events.on('routeChangeStart', () => {
      NProgress.start()
    })
    Router.events.on('routeChangeError', () => {
      NProgress.done()
      auth.setLoading(false)
      console.log('routeChangeError called')
    })
    Router.events.on('routeChangeComplete', () => {
      NProgress.done()
      auth.setLoading(false)
      console.log('routeChangeComplete called')
    })
  }

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (auth.user && auth.user.role) {
      const homeRoute = getHomeRoute(auth.user.role)

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner />
}

export default Home
