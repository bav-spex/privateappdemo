import apiHelper from 'src/store/apiHelper'
import authConfig from 'src/configs/auth'
import { toast } from 'react-hot-toast'

export const getAudits = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.compliance}audit`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data.audits)
    })
    .catch(err => {
      console.log(err)
    })
}

export const deleteSingleAudit = (id, successCallback) => {
  apiHelper(`${authConfig.compliance}audit/${id}`, 'delete', null, {})
    .then(res => {
      getAudits(successCallback)
      toast.error(res.data.data.result)
    })
    .catch(err => {
      console.log(err)
    })
}