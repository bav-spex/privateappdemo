// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import FallbackSpinner from '../spinner'

const AclGuard = props => {
  // ** Props
  const { aclAbilities, children, guestGuard } = props
  const [ability, setAbility] = useState(undefined)
  const [loading, setLoading] = useState(true)
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  // User is logged in, build ability for the user based on his role
  useEffect(() => {
    if (auth.user && auth.user.role) {
      setAbility(buildAbilityFor(auth.user.role.trim(), aclAbilities.subject))
      setLoading(false)
    }
  }, [auth, aclAbilities])

  if (loading) {
    // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
    if (guestGuard || router.route === '/404' || router.route === '/500' || router.route === '/') {
      return <>{children}</>
    } else {
      if (ability) {
        // Render Not Authorized component if the current user has limited access
        return <BlankLayout>{<NotAuthorized />}</BlankLayout>
      } else {
        return (
          <BlankLayout>
            <FallbackSpinner />
          </BlankLayout>
        )
      }
    }
  }
  if (!loading) {
    // Check the access of current user and render pages
    // aclAbilities.action
    if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    }
  }
}

export default AclGuard
