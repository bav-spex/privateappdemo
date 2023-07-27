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
