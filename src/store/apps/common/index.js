import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'

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
  apiHelper(authConfig.owner_list, 'get')
    .then(res => {
      successCallback(res.data.data.users)
    })
    .catch(err => {
      console.log(err)
    })
}
