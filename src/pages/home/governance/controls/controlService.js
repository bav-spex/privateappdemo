//*Axios
import axios from 'axios'
//.config
import authConfig from 'src/configs/auth'
import { siteCall } from 'src/util/web_call'

const deleteControl = (id, errorCallback, successCallback) => {
  siteCall(
    authConfig.delete_control + '/' + id,
    'DELETE',
    {},
    res => {
      if (res?.data?.error) {
        console.log('deleteControl error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('deleteControl success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const getControlList = (errorCallback, successCallback) => {
  siteCall(
    authConfig.controlList,
    'GET',
    {},
    res => {
      if (res?.data?.error?.msg) {
        console.log('getControlList error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('getControlList success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const createControl = (params, errorCallback, successCallback) => {
  siteCall(
    authConfig.control_new,
    'POST',
    params,
    res => {
      if (res?.data?.error) {
        console.log('createControl error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('createControl success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const getControlById = (id, errorCallback, successCallback) => {
  console.log(authConfig.control_by_id)
  siteCall(
    authConfig.control_by_id + '/' + id,
    'GET',
    {},
    res => {
      if (res?.data?.error?.msg) {
        console.log('getControlById error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('getControlById success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const updateControl = (id, params, errorCallback, successCallback) => {
  siteCall(
    authConfig.control_update + '/' + id,
    'PUT',
    params,
    res => {
      if (res?.data?.error?.msg) {
        console.log('updateControl error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('updateControl success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export default deleteControl
