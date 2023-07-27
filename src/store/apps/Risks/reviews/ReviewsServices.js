import apiHelper from 'src/store/apiHelper'
import authConfig from 'src/configs/auth'
import { toast } from 'react-hot-toast'

export const getReviews = (riskId, successCallback, errorCallback) => {
  apiHelper(`${authConfig.riskDevRakshitah}risk/${riskId}/reviews`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getSingleReview = (id, successCallback, errorCallback) => {
  apiHelper(`${authConfig.riskDevRakshitah}get/${id}`, 'get', null, {})
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const deleteSingleReview = (id, riskId, successCallback) => {
  apiHelper(`${authConfig.riskDevRakshitah}delete/${id}`, 'delete', null, {})
    .then(res => {
      getReviews(riskId, successCallback)
      toast.success(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}
