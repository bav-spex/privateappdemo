import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'

export const getMitigations = (riskId, successCallback, errorCallback) => {
  apiHelper(`${authConfig.riskDevRakshitah_base_url}risks/${riskId}/mitigation`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const addNewMitigation = (riskId, payload, successCallback, errorCallback) => {
  // console.log('payload')
  apiHelper(`${authConfig.riskDevRakshitah_base_url}risks/${riskId}/mitigation/new`, 'post', payload, {})
    .then(res => {
      // console.log(res.data)
      // toast.success(res.data.data.msg)
    })
    .catch(err => {
      console.log(err)
    })
}
