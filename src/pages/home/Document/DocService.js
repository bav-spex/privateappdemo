// *Axios
import axios from 'axios'
//*config
import authConfig from 'src/configs/auth'

export  const getDocument = (errorCallback, successCallback) => {
  axios
    .get(authConfig.Document)
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('error:', res.data.error)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const getDocumentById = (errorCallback, successCallback) => {
  axios
    .get(authConfig.documentById + id)
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('error:', res.data.error)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const createDocument = (params, errorCallback, successCallback) => {
  console.log('params:', params)
  axios
    .post(authConfig.create_document, params)
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('allSave:', res.data)
        successCallback(res.body.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const getCategoryData = (id, errorCallback, successCallback) => {
  axios
    .get(authConfig.display_lookup+'/'+id)
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('getCategoryData error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('getCategoryData success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const getTeams = (errorCallback, successCallback) => {
  axios
    .get(authConfig.team_list)
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('getTeams error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('getTeams success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const getUsers = (errorCallback, successCallback) => {
  axios
    .get(authConfig.owner_list)
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('getUsers error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('getUsers success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export default getDocument;