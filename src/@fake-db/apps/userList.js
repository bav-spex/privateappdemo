// ** Mock
import mock from 'src/@fake-db/mock'

const data = {
  users: [
    {
      id: '20171171',
      username: 'rahulsharma',
      primaryEmail: 'rahulsharma@gmail.com',
      secondaryEmail: '',
      firstName: 'Rahul',
      middleName: 'Shridhar',
      lastName: 'Sharma',
      fullName: 'RAHUL SHARMA',
      birthDate: '1993-12-26T07:00:00.000+00:00',
      gender: 'male',
      city: 'Karkardooma',
      stateProvince: 'Delhi',
      postalCode: '411111',
      countryCode: '+91',
      country: 'INDIA',
      creationDate: '2022-11-28T23:46:28.775+00:00',
      lastModifiedDate: '2022-11-28T23:46:28.775+00:00',
      thumbnailPath: 'https://drive.google.com/file/d/1rVrxFaapqFPEptbXP8jVOHY9htL_5l3x/view',
      ratings: 5,
      roles: ['Admin'],
      status: 'Onboarded',
      orgId: 'Delhi',
      school: null,
      diet: 'Karkardooma',
      cluster: 'E 1',
      subCluster: null,
      teacherLevel: 'PRT',
      language: 'English',
      mobileNumber: '9550999814',
      aadharNumber: '123456789911',
      subjects: [''],
      role: 'admin'
    },
    {
      id: '20171172',
      username: 'rahulsharma',
      primaryEmail: 'rahulsharma@gmail.com',
      secondaryEmail: '',
      firstName: 'Pavan',
      middleName: 'Kumar',
      lastName: 'Murapala',
      fullName: 'Pavan Kumar',
      birthDate: '1993-12-26T07:00:00.000+00:00',
      gender: 'male',
      city: 'Karkardooma',
      stateProvince: 'Delhi',
      postalCode: '411111',
      countryCode: '+91',
      country: 'INDIA',
      creationDate: '2022-11-28T23:46:28.775+00:00',
      lastModifiedDate: '2022-11-28T23:46:28.775+00:00',
      thumbnailPath: 'https://drive.google.com/file/d/1rVrxFaapqFPEptbXP8jVOHY9htL_5l3x/view',
      ratings: 5,
      roles: ['Admin'],
      status: 'Onboarded',
      orgId: 'Delhi',
      school: null,
      diet: 'Karkardooma',
      cluster: 'E 1',
      subCluster: null,
      teacherLevel: 'PRT',
      language: 'English',
      mobileNumber: '9550999814',
      aadharNumber: '123456789911',
      subjects: [''],
      role: 'admin'
    },
    {
      id: '20171173',
      username: 'rahulsharma',
      primaryEmail: 'rahulsharma@gmail.com',
      secondaryEmail: '',
      firstName: 'Rahul',
      middleName: 'Shridhar',
      lastName: 'Sharma',
      fullName: 'Sada SHARMA',
      birthDate: '1993-12-26T07:00:00.000+00:00',
      gender: 'male',
      city: 'Karkardooma',
      stateProvince: 'Delhi',
      postalCode: '411111',
      countryCode: '+91',
      country: 'INDIA',
      creationDate: '2022-11-28T23:46:28.775+00:00',
      lastModifiedDate: '2022-11-28T23:46:28.775+00:00',
      thumbnailPath: 'https://drive.google.com/file/d/1rVrxFaapqFPEptbXP8jVOHY9htL_5l3x/view',
      ratings: 5,
      roles: ['Admin'],
      status: 'Onboarded',
      orgId: 'Delhi',
      school: null,
      diet: 'Karkardooma',
      cluster: 'E 1',
      subCluster: null,
      teacherLevel: 'PRT',
      language: 'English',
      mobileNumber: '967670003',
      aadharNumber: '123456789911',
      subjects: [''],
      role: 'admin'
    },
    {
      id: '20171174',
      username: 'palkisharma',
      primaryEmail: 'rahulsharma@gmail.com',
      secondaryEmail: '',
      firstName: 'Palki',
      middleName: '',
      lastName: 'Sharma',
      fullName: 'Palki SHARMA',
      birthDate: '1993-12-26T07:00:00.000+00:00',
      gender: 'male',
      city: 'Karkardooma',
      stateProvince: 'Delhi',
      postalCode: '411111',
      countryCode: '+91',
      country: 'INDIA',
      creationDate: '2022-11-28T23:46:28.775+00:00',
      lastModifiedDate: '2022-11-28T23:46:28.775+00:00',
      thumbnailPath: 'https://drive.google.com/file/d/1rVrxFaapqFPEptbXP8jVOHY9htL_5l3x/view',
      ratings: 5,
      roles: ['Admin'],
      status: 'Onboarded',
      orgId: 'Delhi',
      school: null,
      diet: 'Karkardooma',
      cluster: 'E 1',
      subCluster: null,
      teacherLevel: 'PRT',
      language: 'English',
      mobileNumber: '9676700031',
      aadharNumber: '123456789911',
      subjects: [''],
      role: 'admin'
    },
    {
      id: '20171175',
      username: 'Rahulsharma',
      primaryEmail: 'rajsharma@gmail.com',
      secondaryEmail: '',
      firstName: 'Rahul',
      middleName: '',
      lastName: 'Sharma',
      fullName: 'Rahul SHARMA',
      birthDate: '1993-12-26T07:00:00.000+00:00',
      gender: 'male',
      city: 'Karkardooma',
      stateProvince: 'Delhi',
      postalCode: '411111',
      countryCode: '+91',
      country: 'INDIA',
      creationDate: '2022-11-28T23:46:28.775+00:00',
      lastModifiedDate: '2022-11-28T23:46:28.775+00:00',
      thumbnailPath: 'https://drive.google.com/file/d/1rVrxFaapqFPEptbXP8jVOHY9htL_5l3x/view',
      ratings: 5,
      roles: ['Admin'],
      status: 'Onboarded',
      orgId: 'Delhi',
      school: null,
      diet: 'Karkardooma',
      cluster: 'E 1',
      subCluster: null,
      teacherLevel: 'PRT',
      language: 'English',
      mobileNumber: '9676760003',
      aadharNumber: '123456789911',
      subjects: [''],
      role: 'admin'
    },
    {
      id: '20171176',
      username: 'Rajsharma',
      primaryEmail: 'rajsharma@gmail.com',
      secondaryEmail: '',
      firstName: 'Palki',
      middleName: '',
      lastName: 'Sharma',
      fullName: 'Raj SHARMA',
      birthDate: '1993-12-26T07:00:00.000+00:00',
      gender: 'male',
      city: 'Karkardooma',
      stateProvince: 'Delhi',
      postalCode: '411111',
      countryCode: '+91',
      country: 'INDIA',
      creationDate: '2022-11-28T23:46:28.775+00:00',
      lastModifiedDate: '2022-11-28T23:46:28.775+00:00',
      thumbnailPath: 'https://drive.google.com/file/d/1rVrxFaapqFPEptbXP8jVOHY9htL_5l3x/view',
      ratings: 5,
      roles: ['Admin'],
      status: 'Onboarded',
      orgId: 'Delhi',
      school: null,
      diet: 'Karkardooma',
      cluster: 'E 1',
      subCluster: null,
      teacherLevel: 'PRT',
      language: 'English',
      mobileNumber: '9676760003',
      aadharNumber: '123456789911',
      subjects: [''],
      role: 'admin'
    },
    {
      id: '20171177',
      username: 'ravi',
      primaryEmail: 'raviteja@gmail.com',
      secondaryEmail: '',
      firstName: 'ravi',
      middleName: '',
      lastName: 'teja',
      fullName: 'Ravi teja',
      birthDate: '1993-12-26T07:00:00.000+00:00',
      gender: 'male',
      city: 'Karkardooma',
      stateProvince: 'Delhi',
      postalCode: '411111',
      countryCode: '+91',
      country: 'INDIA',
      creationDate: '2022-11-28T23:46:28.775+00:00',
      lastModifiedDate: '2022-11-28T23:46:28.775+00:00',
      thumbnailPath: 'https://drive.google.com/file/d/1rVrxFaapqFPEptbXP8jVOHY9htL_5l3x/view',
      ratings: 5,
      roles: ['Admin'],
      status: 'Onboarded',
      orgId: 'Delhi',
      school: null,
      diet: 'Karkardooma',
      cluster: 'E 1',
      subCluster: null,
      teacherLevel: 'PRT',
      language: 'English',
      mobileNumber: '9676760003',
      aadharNumber: '123456789911',
      subjects: [''],
      role: 'admin'
    },
    {
      id: '20171178',
      username: 'anitha',
      primaryEmail: 'rajsharma@gmail.com',
      secondaryEmail: '',
      firstName: 'anitha',
      middleName: '',
      lastName: 'kumari',
      fullName: 'Anitha Kumari',
      birthDate: '1993-12-26T07:00:00.000+00:00',
      gender: 'male',
      city: 'Karkardooma',
      stateProvince: 'Delhi',
      postalCode: '411111',
      countryCode: '+91',
      country: 'INDIA',
      creationDate: '2022-11-28T23:46:28.775+00:00',
      lastModifiedDate: '2022-11-28T23:46:28.775+00:00',
      thumbnailPath: 'https://drive.google.com/file/d/1rVrxFaapqFPEptbXP8jVOHY9htL_5l3x/view',
      ratings: 5,
      roles: ['Admin'],
      status: 'Onboarded',
      orgId: 'Delhi',
      school: null,
      diet: 'Non veg',
      cluster: 'E 1',
      subCluster: null,
      teacherLevel: 'PRT',
      language: 'English',
      mobileNumber: '9676760003',
      aadharNumber: '123456789911',
      subjects: [''],
      role: 'admin'
    },
    {
      id: '20171179',
      username: 'nalini',
      primaryEmail: 'nalini@gmail.com',
      secondaryEmail: '',
      firstName: 'nalini',
      middleName: '',
      lastName: 'kumari',
      fullName: 'Nalini kumari',
      birthDate: '1993-12-26T07:00:00.000+00:00',
      gender: 'male',
      city: 'Karkardooma',
      stateProvince: 'Delhi',
      postalCode: '411111',
      countryCode: '+91',
      country: 'INDIA',
      creationDate: '2022-11-28T23:46:28.775+00:00',
      lastModifiedDate: '2022-11-28T23:46:28.775+00:00',
      thumbnailPath: 'https://drive.google.com/file/d/1rVrxFaapqFPEptbXP8jVOHY9htL_5l3x/view',
      ratings: 5,
      roles: ['Admin'],
      status: 'Onboarded',
      orgId: 'Delhi',
      school: null,
      diet: 'Karkardooma',
      cluster: 'E 1',
      subCluster: null,
      teacherLevel: 'PRT',
      language: 'English',
      mobileNumber: '9676760003',
      aadharNumber: '123456789911',
      subjects: [''],
      role: 'admin'
    },
    {
      id: '20171180',
      username: 'vamsi',
      primaryEmail: 'vamsikrishna@gmail.com',
      secondaryEmail: '',
      firstName: 'vamsi',
      middleName: '',
      lastName: 'krishna',
      fullName: 'Vamsi krishna',
      birthDate: '1993-12-26T07:00:00.000+00:00',
      gender: 'male',
      city: 'Karkardooma',
      stateProvince: 'Delhi',
      postalCode: '411111',
      countryCode: '+91',
      country: 'INDIA',
      creationDate: '2022-11-28T23:46:28.775+00:00',
      lastModifiedDate: '2022-11-28T23:46:28.775+00:00',
      thumbnailPath: 'https://drive.google.com/file/d/1rVrxFaapqFPEptbXP8jVOHY9htL_5l3x/view',
      ratings: 5,
      roles: ['Admin'],
      status: 'Onboarded',
      orgId: 'Delhi',
      school: null,
      diet: 'Karkardooma',
      cluster: 'E 1',
      subCluster: null,
      teacherLevel: 'PRT',
      language: 'English',
      mobileNumber: '9676760003',
      aadharNumber: '123456789911',
      subjects: [''],
      role: 'admin'
    },
    {
      id: '20171181',
      username: 'ramarao',
      primaryEmail: 'ramarao@gmail.com',
      secondaryEmail: '',
      firstName: 'Palki',
      middleName: '',
      lastName: 'Sharma',
      fullName: 'Rama Rao',
      birthDate: '1993-12-26T07:00:00.000+00:00',
      gender: 'male',
      city: 'Karkardooma',
      stateProvince: 'Delhi',
      postalCode: '411111',
      countryCode: '+91',
      country: 'INDIA',
      creationDate: '2022-11-28T23:46:28.775+00:00',
      lastModifiedDate: '2022-11-28T23:46:28.775+00:00',
      thumbnailPath: 'https://drive.google.com/file/d/1rVrxFaapqFPEptbXP8jVOHY9htL_5l3x/view',
      ratings: 5,
      roles: ['Admin'],
      status: 'Onboarded',
      orgId: 'Delhi',
      school: null,
      diet: 'Karkardooma',
      cluster: 'E 1',
      subCluster: null,
      teacherLevel: 'PRT',
      language: 'English',
      mobileNumber: '9676760003',
      aadharNumber: '123456789911',
      subjects: [''],
      role: 'admin'
    },
    {
      id: '20171182',
      username: 'Pankajsharma',
      primaryEmail: 'rajsharma@gmail.com',
      secondaryEmail: '',
      firstName: 'Palki',
      middleName: '',
      lastName: 'Sharma',
      fullName: 'Pankaj SHARMA',
      birthDate: '1993-12-26T07:00:00.000+00:00',
      gender: 'male',
      city: 'Karkardooma',
      stateProvince: 'Delhi',
      postalCode: '411111',
      countryCode: '+91',
      country: 'INDIA',
      creationDate: '2022-11-28T23:46:28.775+00:00',
      lastModifiedDate: '2022-11-28T23:46:28.775+00:00',
      thumbnailPath: 'https://drive.google.com/file/d/1rVrxFaapqFPEptbXP8jVOHY9htL_5l3x/view',
      ratings: 5,
      roles: ['Admin'],
      status: 'Onboarded',
      orgId: 'Delhi',
      school: null,
      diet: 'Karkardooma',
      cluster: 'E 1',
      subCluster: null,
      teacherLevel: 'PRT',
      language: 'English',
      mobileNumber: '9676760003',
      aadharNumber: '123456789911',
      subjects: [''],
      role: 'admin'
    },
    {
      id: '20171183',
      username: 'Srini',
      primaryEmail: 'srini@gmail.com',
      secondaryEmail: '',
      firstName: 'Kumar',
      middleName: '',
      lastName: 'Mura',
      fullName: 'Srini Kumar',
      birthDate: '1993-12-26T07:00:00.000+00:00',
      gender: 'male',
      city: 'Karkardooma',
      stateProvince: 'Delhi',
      postalCode: '411111',
      countryCode: '+91',
      country: 'INDIA',
      creationDate: '2022-11-28T23:46:28.775+00:00',
      lastModifiedDate: '2022-11-28T23:46:28.775+00:00',
      thumbnailPath: 'https://drive.google.com/file/d/1rVrxFaapqFPEptbXP8jVOHY9htL_5l3x/view',
      ratings: 5,
      roles: ['Admin'],
      status: 'Onboarded',
      orgId: 'Delhi',
      school: null,
      diet: 'veg',
      cluster: 'E 1',
      subCluster: null,
      teacherLevel: 'PRT',
      language: 'English',
      mobileNumber: '9676760003',
      aadharNumber: '123456789911',
      subjects: [''],
      role: 'admin'
    }
  ]
}

// POST: Add new user
mock.onPost('/apps/users/add-user').reply(config => {
  // Get event from post data
  const user = JSON.parse(config.data).data
  const { length } = data.users
  let lastIndex = 0
  if (length) {
    lastIndex = data.users[length - 1].id
  }
  user.id = lastIndex + 1
  data.users.unshift({ ...user, avatar: '', avatarColor: 'primary', status: 'active' })

  return [201, { user }]
})

// GET: DATA
mock.onGet('/apps/users/list').reply(config => {
  const { q = '', role = null, status = null, currentPlan = null } = config.params ?? ''
  const queryLowered = q.toLowerCase()

  const filteredData = data.users.filter(
    user =>
      (user.username.toLowerCase().includes(queryLowered) ||
        user.fullName.toLowerCase().includes(queryLowered) ||
        (user.primaryEmail.toLowerCase().includes(queryLowered) && user.status.toLowerCase().includes(queryLowered))) &&
      user.role === (role || user.role) &&
      user.status === (status || user.status)
  )

  return [
    200,
    {
      allData: data.users,
      users: filteredData,
      params: config.params,
      total: filteredData.length
    }
  ]
})

// DELETE: Deletes User
mock.onDelete('/apps/users/delete').reply(config => {
  // Get user id from URL
  const userId = config.data
  const userIndex = data.users.findIndex(t => t.id === userId)
  data.users.splice(userIndex, 1)

  return [200]
})

// GET: DATA
mock.onGet('/apps/users/project-list').reply(config => {
  const { q = '' } = config.params ?? ''
  const queryLowered = q.toLowerCase()

  const filteredData = projectListData.filter(
    user =>
      user.projectTitle.toLowerCase().includes(queryLowered) ||
      user.projectType.toLowerCase().includes(queryLowered) ||
      user.totalTask.toLowerCase().includes(queryLowered) ||
      user.hours.toLowerCase().includes(queryLowered) ||
      String(user.progressValue).toLowerCase().includes(queryLowered)
  )

  return [200, filteredData]
})
