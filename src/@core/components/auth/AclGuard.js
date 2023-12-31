// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
// ** Context Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { buildAbilityFor } from 'src/configs/acl'
import { useAuth } from 'src/hooks/useAuth'
import { AbilityContext } from 'src/layouts/components/acl/Can'
// ** Component Import
import NotAuthorized from 'src/pages/401'

// ** Hooks

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
      //setLoading(false)
    }
  }, [auth, aclAbilities])

  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  if (guestGuard || router.route === '/404' || router.route === '/500' || router.route === '/') {
    return <>{children}</>
  }

  // Check the access of current user and render pages
  // aclAbilities.action
  if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  return (
    <BlankLayout>
      <FallbackSpinner />
    </BlankLayout>
  )
}

export default AclGuard
