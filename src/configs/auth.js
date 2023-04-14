const auth_base_url = "https://iac-dev-rakshitah.azurewebsites.net";
const batch_base_url = 'https://ttmsbatchapi.azurewebsites.net:443'
const control_url='https://b0f31c82-ba4a-473d-ae5c-62ede1b98c27.mock.pstmn.io/governance'
const control_by_id_url='https://b0f31c82-ba4a-473d-ae5c-62ede1b98c27.mock.pstmn.io/governance/v1/controls/id'
const control_dropdown_url='https://common-dev-rakshitah.azurewebsites.net/lookup/v1/category'
const test_list_url="https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/governance/v1/complince/test/get"

export default {
    meEndpoint: '/auth/me',
    loginEndpoint: `${auth_base_url}/api/Authenticate/login`,
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
    controlList:`${control_url}/v1/controls`,
    control_by_id: `${control_by_id_url}`,
    control_dropdown: `${control_dropdown_url}`,
    test_list: `${test_list_url}`
}


