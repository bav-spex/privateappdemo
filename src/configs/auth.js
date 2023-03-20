const auth_base_url = "https://d042f483-7812-483b-a81b-c78979b9cb7e.mock.pstmn.io/iac/v1";
const batch_base_url = 'https://ttmsbatchapi.azurewebsites.net:443'

export default {
    meEndpoint: '/auth/me',
    loginEndpoint: `${auth_base_url}/Authenticate/login`,
    loginMockEndpoint: 'jwt/login',
    otpEndpoint: `${auth_base_url}/users/v1/user/validateOTP`,
    registerEndpoint: '/jwt/register',
    storageTokenKeyName: 'accessToken',
    onTokenExpiration: 'refreshToken', // logout | refreshToken
    courseEndpoint: "/courses",
    trainingLocationEndpoint: "/training-locations",
    getAllEmployees : `${batch_base_url}/users/v1?role=Employee`,
    getAllTeachers : `${batch_base_url}/users/v1?role=Teacher`,
    submitBatch : `${batch_base_url}/cohorts/v1/cohorts/`,
    batchList : `${batch_base_url}/cohorts/v1/`,
}