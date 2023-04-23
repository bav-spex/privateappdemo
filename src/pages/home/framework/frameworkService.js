//*Axios
import axios from 'axios'
//.config
import authConfig from 'src/configs/auth'
export const freameworkDetails = (errorCallback, successCallback) => {
  console.log(authConfig.frameWorkbyId)
  axios
    .get(authConfig.frameWorkbyId)
    .then(res => {
      console.log('frameWork details:', res.data)
      if (res.data) {
        successCallback(res.data)
        console.log('frameWork details object:', res.data)        
      } else {
        console.log('error:', res.error.msg)
        if (errorCallback) errorCallback(res.data.error)
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
