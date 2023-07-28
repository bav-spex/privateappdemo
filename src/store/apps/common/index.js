import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'
// https://iac-rakshitah-dev.politeforest-c2818b6a.southeastasia.azurecontainerapps.io/iam/teams

export const getTeamDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.team_list, 'get')
    .then(res => {
      successCallback(res.data.data.users)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getAdditionlStakeHoldersDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.additionalStokeHolders, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getNextStepsDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.next_step_list, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getCategoryDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.category_list, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getAuditStatusDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.audit_status_list, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}
