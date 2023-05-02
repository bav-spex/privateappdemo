const auth_base_url = 'https://iac-dev-rakshitah.azurewebsites.net'
const batch_base_url = 'https://ttmsbatchapi.azurewebsites.net:443'
const risk_base_url = ' https://9d9560c9-7f96-4865-9747-d5a8232c9a70.mock.pstmn.io/'
const risk_category_url = ' https://common-dev-rakshitah.azurewebsites.net/'
const risk_source_url = 'https://common-dev-rakshitah.azurewebsites.net/'
const site_location_url = 'https://common-dev-rakshitah.azurewebsites.net/'
const current_likelihood_url = 'https://common-dev-rakshitah.azurewebsites.net/'
const current_Impact_url = 'https://common-dev-rakshitah.azurewebsites.net/'
const risk_scoring_url = 'https://common-dev-rakshitah.azurewebsites.net/'
const Affected_Assets_url = 'https://common-dev-rakshitah.azurewebsites.net/'
const technology_url = 'https://common-dev-rakshitah.azurewebsites.net/'
const owner_url = 'https://d042f483-7812-483b-a81b-c78979b9cb7e.mock.pstmn.io/iac/v1/users'
const team_list_url = 'https://d042f483-7812-483b-a81b-c78979b9cb7e.mock.pstmn.io/iac/v1/teams'
const risk_mapping_list_url = 'https://common-dev-rakshitah.azurewebsites.net/lookup/v1/category/28'
const threat_mapping_list_url = 'https://common-dev-rakshitah.azurewebsites.net/lookup/v1/category/2'
const regulation_dropdown_url = 'https://governance-dev-rakshitah.azurewebsites.net/governance/v1/frameworks/getAll'
const edit_risk_url= 'https://9d9560c9-7f96-4865-9747-d5a8232c9a70.mock.pstmn.io/rmf/v1/risks/update'
const mitigation_url = ` https://9d9560c9-7f96-4865-9747-d5a8232c9a70.mock.pstmn.io/`
const riskSave_url = `https://9d9560c9-7f96-4865-9747-d5a8232c9a70.mock.pstmn.io/`
const savemitigation_url = 'https://9d9560c9-7f96-4865-9747-d5a8232c9a70.mock.pstmn.io/'
const frameWork_src_url = `https://governance-dev-rakshitah.azurewebsites.net/`
const getDocument_url = `https://b0f31c82-ba4a-473d-ae5c-62ede1b98c27.mock.pstmn.io/`
const saveDocument_url = `https://b0f31c82-ba4a-473d-ae5c-62ede1b98c27.mock.pstmn.io/`
const editDocument_url = 'https://b0f31c82-ba4a-473d-ae5c-62ede1b98c27.mock.pstmn.io/'
// const control_url='https://b0f31c82-ba4a-473d-ae5c-62ede1b98c27.mock.pstmn.io/governance'
const control_url='https://governance-dev-rakshitah.azurewebsites.net/governance/v1/controls/getAllNewControl'
const control_by_id_url='https://b0f31c82-ba4a-473d-ae5c-62ede1b98c27.mock.pstmn.io/governance/v1/controls/id'
// const control_new_url='https://b0f31c82-ba4a-473d-ae5c-62ede1b98c27.mock.pstmn.io/governance/v1/controls/new'
const control_new_url='https://governance-dev-rakshitah.azurewebsites.net/governance/v1/controls/new'
const control_update_url='https://governance-dev-rakshitah.azurewebsites.net/governance/v1/controls/update'
const control_dropdown_url='https://common-dev-rakshitah.azurewebsites.net/lookup/v1/category'
const test_list_url="https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/governance/v1/complince/test/get"
const category_list_url= "https://common-dev-rakshitah.azurewebsites.net/categories/v1/get"
const display_lookup_url= "https://common-dev-rakshitah.azurewebsites.net/lookup/v1/category"
const managmentReview_url = 'https://9d9560c9-7f96-4865-9747-d5a8232c9a70.mock.pstmn.io/'
const mitigation_effort_url = 'https://common-dev-rakshitah.azurewebsites.net/lookup/v1/category/22'
const planning_strategy_url= 'https://common-dev-rakshitah.azurewebsites.net/lookup/v1/category/21'
const mitigation_update_url= 'https://9d9560c9-7f96-4865-9747-d5a8232c9a70.mock.pstmn.io/rmf/risk/1/mitigation/update'
const speedometer_url= 'https://93acb311-efd1-41f4-a1d7-ca1854fb1c71.mock.pstmn.io/rmf/v1/risks/avgscore'
const open_risk_url= 'https://93acb311-efd1-41f4-a1d7-ca1854fb1c71.mock.pstmn.io/rmf/v1/risks/bystatus'
const edit_framework_url = 'https://governance-dev-rakshitah.azurewebsites.net/governance/v1/frameworks/update'
const new_framework_url= 'https://governance-dev-rakshitah.azurewebsites.net/governance/v1/frameworks/new'
const audit_dropdown_url= 'https://common-dev-rakshitah.azurewebsites.net/lookup/v1/category'
const fetch_audit_url= 'https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/complince/v1/audit'
const edit_audit_url= 'https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/complince/v1/audit/testresult/update'
const add_comment_url= 'https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/complince/v1/audit/23/testresult/comments'
const comment_list_url ='https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/complince/v1/audit'
const risk_list_url= 'https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/complince/v1/audit'
const add_test_url= 'https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/governance/v1/complince/test/new'
const save_existing_list_url= 'https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/complince/v1/audit/23/testresult/risks'
const fetch_existing_list_url= 'https://9d9560c9-7f96-4865-9747-d5a8232c9a70.mock.pstmn.io/rmf/v1/risks'
const audit_data_url= 'https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/governance/v1/complince/audits/test'
const add_audit_url= 'https://f525f519-f643-4c90-bd0d-bbc4eb466021.mock.pstmn.io/complince/v1/audit/new'


export default {
  meEndpoint: '/auth/me',
  loginEndpoint: `${auth_base_url}/api/Authenticate/login`,
  loginMockEndpoint: 'jwt/login',
  otpEndpoint: `${auth_base_url}/users/v1/user/validateOTP`,
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  courseEndpoint: '/courses',
  trainingLocationEndpoint: '/training-locations',
  getAllEmployees: `${batch_base_url}/users/v1?role=Employee`,
  getAllTeachers: `${batch_base_url}/users/v1?role=Teacher`,
  submitBatch: `${batch_base_url}/cohorts/v1/cohorts/`,
  batchList: `${batch_base_url}/cohorts/v1/`,
  // riskListEndPoint: `${risk_base_url}/rmf/v1/risks/id/`,
  riskListEndPoint: `${risk_base_url}rmf/v1/risks/id`,
  riskCategory: `${risk_category_url}lookup/v1/category/12`,
  // riskSource: `${risk_source_url}lookup/v1/category/12`,
  riskSource: `${risk_source_url}lookup/v1/category/13`,
  siteLocation: `${site_location_url}lookup/v1/category/14`,
  scoreRisk: `${risk_scoring_url}lookup/v1/category/15`,
  // currentLike: `${current_likelihood_url}lookup/v1/category/16`,
  currentLike: `${current_likelihood_url}lookup/v1/category/16`,
  edit_risk: `${edit_risk_url}`,
  currentImpact: `${current_Impact_url}lookup/v1/category/17`,
  affectedAssets: `${Affected_Assets_url}lookup/v1/category/18`,
  technlogy: `${technology_url}lookup/v1/category/19`,
  owner_list: `${owner_url}`,
  team_list: `${team_list_url}`,
  risk_mapping_list: `${risk_mapping_list_url}`,
  threat_mapping_list: `${threat_mapping_list_url}`,
  regulation_dropdown: `${regulation_dropdown_url}`,
  riskAll: `${risk_base_url}/rmf/v1/risks`,
  // frameWorkAllID: `${frameWorks_url_ID}/governance/v1/frameworks`,
  // frameWorkAll: `${frameWorkAll_url}governance/v1/frameworks/getAll`,
  // riskAll: `${risk_base_url}/rmf/v1/risks`,  
  frameWorkAll: `${frameWork_src_url}governance/v1/frameworks/getAll`,
  // frameWorkbyId: `${frameWork_src_url}governance/v1/frameworks/get/1`,
  frameWorkbyId: `${frameWork_src_url}governance/v1/frameworks/get`,
  frameWork_new: `${frameWork_src_url}governance/v1/frameworks/new/`,
  frameWork_update: `${frameWork_src_url}governance/v1/frameworks/update/`,
  Document: `${getDocument_url}governance/v1/documents/get`,
  editDoc: `${editDocument_url}governance/v1/documents/id/56`,
  saveAllDocs: `${saveDocument_url}governance/v1/documents/update/1456`,
  // mitigation: `${mitigation_url}rmf/v1/risks/1/mitigation`,
  mitigation: `${mitigation_url}rmf/v1/risks/`,
  mitigation_effort: `${mitigation_effort_url}`,
  planning_strategy: `${planning_strategy_url}`,
  mitigation_update: `${mitigation_update_url}`,
  saveAllRisk: `${riskSave_url}rmf/v1/risks/new`,
  saveAllMitigation: `${savemitigation_url}rmf/risk/1/mitigation/update/51`,
  controlList:`${control_url}`,
  control_by_id: `${control_by_id_url}`,
  control_dropdown: `${control_dropdown_url}`,
  test_list: `${test_list_url}`,
  category_list: category_list_url,
  display_lookup: display_lookup_url,
  SaveAllMiti: `${savemitigation_url}rmf/risk/1/mitigation/update/51`,
  getmanagmentReview: `${managmentReview_url}rmf/v1/risk/1/reviews/last`,
  speedometer: `${speedometer_url}`,
  open_risk: `${open_risk_url}`,
  control_new: `${control_new_url}`,
  edit_framework: `${edit_framework_url}`,
  new_framework: `${new_framework_url}`,
  audit_dropdown: `${audit_dropdown_url}`,
  edit_audit: `${edit_audit_url}`,
  fetch_audit: `${fetch_audit_url}`,
  add_comment: `${add_comment_url}`,
  comment_list: `${comment_list_url}`,
  risk_list: `${risk_list_url}`,
  add_test: `${add_test_url}`,
  save_existing_list: `${save_existing_list_url}`,
  fetch_existing_list: `${fetch_existing_list_url}`,
  audit_data: `${audit_data_url}`,
  add_audit: `${add_audit_url}`,
  control_update: `${control_update_url}`
}

