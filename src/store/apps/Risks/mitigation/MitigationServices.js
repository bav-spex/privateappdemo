import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'

export const getMitigations = (riskId, successCallback, errorCallback) => {
  apiHelper(`${authConfig.riskDevRakshitah}risks/${riskId}/mitigation`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const addNewMitigation = (riskId, payload, successCallback, errorCallback) => {
  // console.log('payload')
  apiHelper(`${authConfig.riskDevRakshitah}risks/${riskId}/mitigation/new`, 'post', payload, {})
    .then(res => {
      // console.log(res.data)
      // toast.success(res.data.data.msg)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getEffortsDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.mitigation_effort, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getStrategyDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.planning_strategy, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getControlDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.controls_dropdown, 'get')
    .then(res => {
      successCallback(res.data.data.controls)
    })
    .catch(err => {
      console.log(err)
    })
}
