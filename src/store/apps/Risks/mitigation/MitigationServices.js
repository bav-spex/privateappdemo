import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'

export const getEffortsDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.mitigation_effort, 'get')
    .then(res => {
      console.log(res.data)
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getStrategyDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.planning_strategy, 'get')
    .then(res => {
      console.log(res.data)
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getControlDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.control_dropdown, 'get')
    .then(res => {
      console.log(res.data)
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}
