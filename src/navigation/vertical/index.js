const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home/charts',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Governance',
      path: '/home/framework',
      icon: 'mdi:bank',

      children: [
        // {
        //   title: 'Frameworks',
        //   path: '/home/framework/list'
        // },
        {
          title: 'Frameworks',
          path: '/home/framework'
        },
        {
          title: 'Controls',
          path: '/home/governance/controls'
        },
        {
          title: 'Documents',
          path: '/home/Document'
        }
      ]
    },    
    {
      title: 'Risk Management',
      path: '/home/risk',
      icon: 'mdi:progress-alert',
      children: [
        {
          title: 'Risks',
          path: '/home/risk'
        }
      ]
    },
    {
      title: 'Complaince',
      path: '/home/complaince',
      icon: 'mdi:license',
      children: [
        {
          title: 'Tests',
          path: '/home/complaince/test'
        }
      ]
    },
    {
      title: 'Settings',
      path: '/home/Settings',
      icon: 'mdi:cog',
      children: [
        {
          title: 'Lookups',
          path: '/home/common/lookups'
        },
        {
          title: 'Users',
          path: '/users/list'
        },
        {
          title: 'Roles',
          path: '/users/roles'
        }
      ]
    }   
  ]
}

export default navigation
