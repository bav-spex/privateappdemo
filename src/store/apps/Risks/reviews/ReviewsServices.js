import apiHelper from 'src/store/apiHelper'
import authConfig from 'src/configs/auth'

export const getReviews = (riskId, successCallback, errorCallback) => {
  apiHelper(`${authConfig.riskDevRakshitah}risk/${riskId}/reviews`, 'get', null, {})
    .then(res => {
      // console.log(res.data)
      // successCallback(res.data.data.risk)
    })
    .catch(err => {
      console.log(err)
    })
}
