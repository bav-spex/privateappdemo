// *Axios
import axios from 'axios'
//*config
import authConfig from 'src/configs/auth'

export  const getDocument = (errorCallback, successCallback) => {
  axios
    .get(authConfig.Document)
    .then(res => {
      if (res.data.error.msg) {
        console.log('error:', res.data.error)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const edit = (errorCallback, successCallback) => {
  axios
    .get(authConfig.editDoc)
    .then(res => {
      if (res.data.error.msg) {
        console.log('error:', res.data.error)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const saveDocs = (params, errorCallback, successCallback) => {
  console.log('params:', params)
  axios
    .post(authConfig.saveAllDocs, params)
    .then(res => {
      if (res.data.error.msg) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('allSave:', res.data)
        successCallback(res.body.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}
export default getDocument;