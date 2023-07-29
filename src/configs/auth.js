// const governance_base_url = 'http://localhost:8080'
const riskDevRakshitah_base_url = 'https://risk-dev-rakshitah.azurewebsites.net/rmf/v1/'
const commonDevRakshitah_base_url = 'https://common-dev-rakshitah.azurewebsites.net/lookup/v1/'
const governanceDevRakshitah_base_url = 'https://governance-dev-rakshitah.azurewebsites.net/governance/v1/'

const authDevRakshitah_base_url =
  'https://iac-rakshitah-dev.politeforest-c2818b6a.southeastasia.azurecontainerapps.io/iam/'
const complianceDevRakshitah_base_url = 'https://compliance-dev-rakshitah.azurewebsites.net/compliance/v1/'
const team_list_url = 'https://d042f483-7812-483b-a81b-c78979b9cb7e.mock.pstmn.io/iac/v1/teams'

const mock_finidings_url = 'https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/compliance/v1/'

// Need to refactor below urls
const governance_base_url = 'https://governance-dev-rakshitah.azurewebsites.net'
const compliance_base_url = 'https://compliance-dev-rakshitah.azurewebsites.net/compliance/v1/'
const common_base_url = 'https://common-dev-rakshitah.azurewebsites.net'
const auth_base_url = 'https://iac-rakshitah-dev.politeforest-c2818b6a.southeastasia.azurecontainerapps.io'
const risk_base_url = 'https://risk-dev-rakshitah.azurewebsites.net'
const batch_base_url = 'https://ttmsbatchapi.azurewebsites.net:443'
const control_url = `${governance_base_url}/governance/v1/controls/get`
const control_by_id_url = `${governance_base_url}/governance/v1/controls/id`
const control_new_url = `${governance_base_url}/governance/v1/controls/new`
const control_update_url = `${governance_base_url}/governance/v1/controls/update`
const delete_control_url = `${governance_base_url}/governance/v1/controls/delete`
const control_dropdown_url = `${common_base_url}/lookup/v1/category`
const get_tests_url = `${compliance_base_url}test/get`
const categories_list_url = `${common_base_url}/categories/v1/get`
const display_lookup_url = `${common_base_url}/lookup/v1/category`
const mitigation_update_url = `${risk_base_url}/rmf/risk/1/mitigation/update`
const speedometer_url = 'https://93acb311-efd1-41f4-a1d7-ca1854fb1c71.mock.pstmn.io/rmf/v1/risks/avgscore'
const open_risk_url = 'https://93acb311-efd1-41f4-a1d7-ca1854fb1c71.mock.pstmn.io/rmf/v1/risks/bystatus'
const edit_framework_url = `${governance_base_url}/governance/v1/frameworks/update`
const delete_framework_url = `${governance_base_url}/governance/v1/frameworks/delete`
const new_framework_url = `${governance_base_url}/governance/v1/frameworks/new`
const audit_dropdown_url = `${common_base_url}/lookup/v1/category`
const update_assessment_url = `${compliance_base_url}/compliance/v1/assessment/testresult/update`
const add_assessment_comment_url = `${compliance_base_url}/compliance/v1/assessment/testresult/comments`
const comment_list_url = 'https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/complince/v1/audit'
const risk_list_url = 'https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/complince/v1/audit'
const add_test_url = `${compliance_base_url}/compliance/v1/test/new`
const update_test_url = `${compliance_base_url}/compliance/v1/test/update/`
const save_existing_list_url =
  'https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/complince/v1/audit/23/testresult/risks'
const fetch_existing_list_url = `${risk_base_url}/rmf/v1/risks/get`
// const fetch_existing_list_url= 'https://9d9560c9-7f96-4865-9747-d5a8232c9a70.mock.pstmn.io/rmf/v1/risks'
const get_test_data_by_id_url = `${compliance_base_url}test/`
const add_assessment_url = `${compliance_base_url}/compliance/v1/assessment/new`
const get_assessment_url = `${compliance_base_url}/compliance/v1/assessment/`
const add_lookup_url = `${common_base_url}/lookup/v1/category`
const edit_lookup_url = `${common_base_url}/lookup/v1/update`
const test_url = 'http://localhost:8091/compliance/v1/test'
const adit_url = 'http://localhost:8091/compliance/v1/audit'

export default {
  riskDevRakshitah_base_url: riskDevRakshitah_base_url,
  commonDevRakshitah_base_url: commonDevRakshitah_base_url,
  governanceDevRakshitah_base_url: governanceDevRakshitah_base_url,
  authDevRakshitah_base_url: authDevRakshitah_base_url,
  complianceDevRakshitah_base_url: complianceDevRakshitah_base_url,

  team_list_url: team_list_url,

  mock_finidings_url: mock_finidings_url,

  meEndpoint: `${authDevRakshitah_base_url}authenticate/me`,
  loginEndpoint: `${authDevRakshitah_base_url}authenticate/login`,

  // Need to refactor below  variable
  compliance: compliance_base_url,
  loginMockEndpoint: 'jwt/login',
  otpEndpoint: `${auth_base_url}/users/v1/user/validateOTP`,
  registerEndpoint: `${auth_base_url}/iam/authenticate/register`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  courseEndpoint: '/courses',
  trainingLocationEndpoint: '/training-locations',
  getAllEmployees: `${batch_base_url}/users/v1?role=Employee`,
  getAllTeachers: `${batch_base_url}/users/v1?role=Teacher`,
  submitBatch: `${batch_base_url}/cohorts/v1/cohorts/`,
  batchList: `${batch_base_url}/cohorts/v1/`,

  frameWorkAll: `${governance_base_url}/governance/v1/frameworks/getAll`,
  frameWorkbyId: `${governance_base_url}/governance/v1/frameworks/get`,
  frameWork_new: `${governance_base_url}/governance/v1/frameworks/new/`,
  frameWork_update: `${governance_base_url}/governance/v1/frameworks/update/`,
  Document: `${governance_base_url}/governance/v1/documents/getAll`,
  documentById: `${governance_base_url}/governance/v1/documents/id/`,
  create_document: `${governance_base_url}/governance/v1/documents/new`,
  update_document: `${governance_base_url}/governance/v1/documents/update/`,
  delete_document: `${governance_base_url}/governance/v1/documents/delete/`,
  mitigation_update: `${mitigation_update_url}`,
  controlList: `${control_url}`,
  control_by_id: `${control_by_id_url}`,
  control_dropdown: `${control_dropdown_url}`,
  get_tests: `${get_tests_url}`,
  categories_list: categories_list_url,
  display_lookup: display_lookup_url,
  speedometer: `${speedometer_url}`,
  open_risk: `${open_risk_url}`,
  control_new: `${control_new_url}`,
  delete_control: delete_control_url,
  edit_framework: `${edit_framework_url}`,
  delete_framework: delete_framework_url,
  new_framework: `${new_framework_url}`,
  audit_dropdown: `${audit_dropdown_url}`,
  update_assessment: `${update_assessment_url}`,
  get_assessment_by_id: `${get_assessment_url}`,
  add_assessment_comment: `${add_assessment_comment_url}`,
  comment_list: comment_list_url,
  risk_list: `${risk_list_url}`,
  add_test: `${add_test_url}`,
  update_test: update_test_url,
  save_existing_list: `${save_existing_list_url}`,
  fetch_existing_list: `${fetch_existing_list_url}`,
  get_test_data_by_id: `${get_test_data_by_id_url}`,
  add_assessment: `${add_assessment_url}`,
  control_update: `${control_update_url}`,
  add_lookup: `${add_lookup_url}`,
  edit_lookup: `${edit_lookup_url}`,
  audit_url: `${test_url}`,
  test_url: `${adit_url}`
}
