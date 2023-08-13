import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'

export const getSingleControl = (controlId, successCallback, setLoading) => {
  apiHelper(`${authConfig.governanceDevRakshitah_base_url}controls/id/${controlId}`, 'get', null, {})
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

export const getAllControls = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.governanceDevRakshitah_base_url}controls/get`, 'get', null, {})
    .then(res => {
      // successCallback(res.data.data.requirementSections)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getArtifactsByControlId = (controlId, successCallback, setLoading) => {
  apiHelper(`${authConfig.governanceDevRakshitah_base_url}controls/${controlId}/artifacts`, 'get', null, {})
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
