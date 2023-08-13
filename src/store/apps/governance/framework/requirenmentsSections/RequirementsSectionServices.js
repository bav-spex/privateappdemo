import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'

export const getRequirenmentSectionsByFrameworkId = (frameworkId, successCallback, setLoading) => {
  apiHelper(`${authConfig.governanceDevRakshitah_base_url}requirementsection/framework/${frameworkId}`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data.requirementSections)
      if (setLoading) {
        setLoading(false)
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const getAllRequirenmentSections = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.governanceDevRakshitah_base_url}requirementsection/get`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data.requirementSections)
    })
    .catch(err => {
      console.log(err)
    })
}
