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
    }
  ]
}

export default navigation
