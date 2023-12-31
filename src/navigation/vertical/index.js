import { useTheme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const Navigation = () => {
  const { t, i18n } = useTranslation()
  const theme = useTheme()

  return [
    {
      title: t('Home'),
      path: '/home/dashboard',
      icon: 'mdi:home-outline'
    },
    {
      title: t('Governance'),
      path: '/home/framework',
      icon: 'mdi:bank',

      children: [
        // {
        //   title: 'Frameworks',
        //   path: '/home/framework/list'
        // },
        {
          title: t('Frameworks'),
          path: '/home/governance/framework'
        },
        {
          title: t('Controls'),
          path: '/home/governance/controls'
        },
        {
          title: t('Documents'),
          path: '/home/Document'
        }
      ]
    },
    {
      title: t('Risk Management'),
      path: '/home/risk',
      icon: 'mdi:progress-alert',
      children: [
        {
          title: t('Risks'),
          path: '/home/risk'
        }
      ]
    },
    {
      title: t('Compliance'),
      path: '/home/compliance',
      icon: 'mdi:license',
      children: [
        {
          title: t('Tests & Assesments'),
          path: '/home/compliance/test'
        },
        {
          title: t('Audits'),
          path: '/home/compliance/audits'
        }
      ]
    },
    {
      title: t('Settings'),
      path: '/home/Settings',
      icon: 'mdi:cog',
      children: [
        {
          title: t('Lookups'),
          path: '/home/common/lookups'
        },
        {
          title: t('Users'),
          path: '/users/list'
        },
        {
          title: t('Roles'),
          path: '/users/roles'
        }
      ]
    }
  ]
}

export default Navigation
