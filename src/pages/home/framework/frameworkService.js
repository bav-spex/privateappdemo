//*Axios
import axios from 'axios'
//.config
import authConfig from 'src/configs/auth'
export const allFrameWorks = (errorCallback, successCallback) => {
  axios
    .get(authConfig.frameWorkAllID)
    .then(res => {
      console.log('frameWorkAll:', res)
      if (res.data.error) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        successCallback(res.data)
        console.log('allframeWork:', res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const fwa = (errorCallback, successCallback) => {
  axios
    .get(authConfig.frameWorkAll)
    .then(res => {
      console.log('alldata', res)
      if (res.data.error) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        successCallback(res.data)
        console.log('allfw:', res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}
