// *Axios
import axios from 'axios'
//*config
import authConfig from 'src/configs/auth'
import moment from 'moment'
import { siteCall } from 'src/util/web_call'

export const getDocument = (errorCallback, successCallback) => {
  siteCall(
    authConfig.Document,
    'GET',
    {},
    res => {
      if (res?.data?.error?.msg) {
        console.log('getDocument error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('getDocument success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const getDocumentById = (id, errorCallback, successCallback) => {
  siteCall(
    authConfig.documentById + id,
    'GET',
    {},
    res => {
      if (res?.data?.error?.msg) {
        console.log('getDocumentById error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('getDocumentById success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const createDocument = (params, errorCallback, successCallback) => {
  siteCall(
    authConfig.create_document,
    'POST',
    params,
    res => {
      if (res?.data?.error?.msg) {
        console.log('createDocument error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('createDocument success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const updateDocument = (id, params, errorCallback, successCallback) => {
  siteCall(
    authConfig.update_document + id,
    'PUT',
    params,
    res => {
      if (res?.data?.error?.msg) {
        console.log('updateDocument error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('updateDocument success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const getCategoryData = (id, errorCallback, successCallback) => {
  siteCall(
    authConfig.display_lookup + '/' + id,
    'GET',
    {},
    res => {
      if (res?.data?.error?.msg) {
        console.log('getCategoryData error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('getCategoryData success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const getTeams = (errorCallback, successCallback) => {
  siteCall(
    authConfig.team_list,
    'GET',
    {},
    res => {
      if (res?.data?.error?.msg) {
        console.log('getTeams error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('getTeams success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const getUsers = (errorCallback, successCallback) => {
  siteCall(
    authConfig.owner_list,
    'GET',
    {},
    res => {
      if (res?.data?.error?.msg) {
        console.log('getUsers error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('getUsers success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const deleteDocument = (id, errorCallback, successCallback) => {
  siteCall(
    authConfig.delete_document + id,
    'DELETE',
    {},
    res => {
      if (res?.data?.error?.msg) {
        console.log('deleteDocument error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('deleteDocument success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
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
