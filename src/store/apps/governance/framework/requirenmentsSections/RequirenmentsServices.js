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

export const getAllControls = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.governanceDevRakshitah_base_url}controls/get`, 'get', null, {})
    .then(res => {
      console.log(res.data.data.controls)
      // successCallback(res.data.data.requirementSections)
    })
    .catch(err => {
      console.log(err)
    })
}

export const createRequirenmentSections = (payload, successCallback, errorCallback) => {
  apiHelper(`${authConfig.governanceDevRakshitah_base_url}requirementsection/new`, 'post', payload, {})
    .then(res => {
      console.log(res.data.data.msg)
      toast.success(res.data.data.msg)
    })
    .catch(err => {
      console.log(err)
    })
}
