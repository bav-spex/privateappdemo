import apiHelper from 'src/store/apiHelper'
import authConfig from 'src/configs/auth'
import { toast } from 'react-hot-toast'

export const getFindings = (auditId, successCallback, setLoading) => {
  apiHelper(`${authConfig.mock_finidings_url}audit/${auditId}/findings`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getRisksByFindings = (findingId, successCallback) => {
  apiHelper(`${authConfig.mock_finidings_url}audit/finding/${findingId}/risks`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data.risks)
    })
    .catch(err => {
      console.log(err)
    })
}
