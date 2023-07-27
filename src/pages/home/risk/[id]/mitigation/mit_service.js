//*Axios
import axios from 'axios'
//.config
import authConfig from 'src/configs/auth'

const dummy = (errorCallback, successCallback) => {}

export const fetchMit = (errorCallback, successCallback) => {
  axios
    .get(authConfig.mitigation)
    .then(res => {
      console.log('respo:', res.data)
      if (!res) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('mitigation:', res)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const SaveAllM = (params, errorCallback, successCallback) => {
  axios
    .post(authConfig.SaveAllMiti, params)
    .then(res => {
      if (res.data.error.msg) {
        console.log('error:', res)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('allMit:', res.data)
        successCallback(res.body.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}
export default dummy
