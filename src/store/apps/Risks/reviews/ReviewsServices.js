import { toast } from 'react-hot-toast'
import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'

export const getReviews = (riskId, successCallback, setLoading) => {
  apiHelper(`${authConfig.riskDevRakshitah_base_url}risk/${riskId}/reviews`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
    })
}

export const deleteSingleReview = (id, riskId, successCallback) => {
  apiHelper(`${authConfig.riskDevRakshitah_base_url}delete/${id}`, 'delete', null, {})
    .then(res => {
      getReviews(riskId, successCallback)
      toast.error(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}
