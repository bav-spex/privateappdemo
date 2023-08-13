import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'

export const getAllRequirenment = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.governanceDevRakshitah_base_url}requirement/get`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data.requirementSections)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getSingleRequirenment = (requirementId, successCallback, setLoading) => {
  apiHelper(`${authConfig.governanceDevRakshitah_base_url}requirement/id/${requirementId}`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data)
      if (setLoading) {
        setLoading(false)
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const getControlsByRequirenmentId = (requirementId, successCallback, setLoading) => {
  apiHelper(`${authConfig.governanceDevRakshitah_base_url}requirement/${requirementId}/control`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data.controlIds)
      if (setLoading) {
        setLoading(false)
      }
    })
    .catch(err => {
      console.log(err)
    })
}
