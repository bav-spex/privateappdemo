const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline',
    },
    {
      title: 'Batches',
      path: '/home/batch/list',
      icon: 'mdi:grid',

      /* children: [
        {
          title: 'List',
          path: '/home/batch/list'
        },
        {
          title: 'Create',
          path: '/home/batch/create'
        }
      ] */
    },
    // {
    //   title: 'Framework',
    //   path: 'home/framework/list',
    //   icon: 'mdi:home-outline',
    // },
    {
      title: 'Framework',
      path: '/home/framework/list',
      icon: 'mdi:grid',

      /* children: [
        {
          title: 'List',
          path: '/home/batch/list'
        },
        {
          title: 'Create',
          path: '/home/batch/create'
        }
      ] */
    },
    {
      title: 'Charts',
      path: '/home/charts',
      icon: 'mdi:grid',
    },
  ]
}

export default navigation
