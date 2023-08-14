import { toast } from 'react-hot-toast'
import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'

export const getAudits = (successCallback, setLoading) => {
  apiHelper(`${authConfig.complianceDevRakshitah_base_url}audit`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data.audits)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
    })
}

export const deleteSingleAudit = (id, successCallback) => {
  apiHelper(`${authConfig.complianceDevRakshitah_base_url}audit/${id}`, 'delete', null, {})
    .then(res => {
      getAudits(successCallback)
      toast.error(res.data.data.result)
    })
    .catch(err => {
      console.log(err)
    })
}
