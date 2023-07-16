// *Axios
import axios from 'axios'
//*config
import authConfig from 'src/configs/auth'
import moment from 'moment'

export const getDocument = (errorCallback, successCallback) => {
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

export const getDocumentById = (id, errorCallback, successCallback) => {
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
  axios
    .post(authConfig.create_document, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('createDocument error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('createDocument success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const updateDocument = (id, params, errorCallback, successCallback) => {
  axios
    .put(authConfig.update_document + id, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('updateDocument error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('updateDocument success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const getCategoryData = (id, errorCallback, successCallback) => {
  axios
    .get(authConfig.display_lookup + '/' + id)
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

export const deleteDocument = (id, errorCallback, successCallback) => {
  axios
    .delete(authConfig.delete_document + id)
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('deleteDocument error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('deleteDocument success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const convertDateFormat = (date, date_format) => {
  date_format = date_format || 'YYYY-MM-DD'
  try {
    date = moment(date).format(date_format)
  } catch (err) {
    console.log('MOMENT ERROR:', err)
  }
  return date
}

export default getDocument
