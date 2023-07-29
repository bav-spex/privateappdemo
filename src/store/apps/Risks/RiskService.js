//*Axios
import axios from 'axios'
import toast from 'react-hot-toast'
//.config
import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'

export const deleteSingleRisk = (id, setRisks) => {
  apiHelper(`${authConfig.riskDevRakshitah_base_url}delete/${id}`, 'delete', null, {})
    .then(res => {
      toast.error(res.data.data.msg)
      getRisks(() => {}, setRisks)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getRisks = (successCallback, setLoading) => {
  apiHelper(`${authConfig.riskDevRakshitah_base_url}risks/get`, 'get', null, {})
    .then(res => {
      successCallback(res.data.data.risk)
      setLoading && setLoading(false)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getSingleRisk = (id, errorCallback, successCallback, setLoading) => {
  apiHelper(`${authConfig.riskDevRakshitah_base_url}risks/${id}`, 'get')
    .then(res => {
      successCallback(res.data.data)
      setLoading(false)
    })
    .catch(err => {
      if (res.data.error.msg != '') {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        errorCallback ? errorCallback(err) : null
      }
    })
}
