//*Axios
import axios from 'axios'
//.config
import authConfig from 'src/configs/auth'
import { siteCall } from 'src/util/web_call'

export const getFrameworkById = (id, errorCallback, successCallback) => {
  console.log(authConfig.frameWorkbyId)
  siteCall(
    authConfig.frameWorkbyId + '/' + id,
    'GET',
    {},
    res => {
      if (res?.data?.error?.msg) {
        console.log('getFrameworkById error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('getFrameworkById success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const getFrameworks = (errorCallback, successCallback) => {
  siteCall(authConfig.frameWorkAll, "GET", {}, (res) => {
      if (res?.data?.error?.msg) {
          console.log('getFrameworks error:', res.data)
          if (errorCallback) errorCallback(res.data.error.msg)
      } else {
          console.log('getFrameworks success:', res.data)
          successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const deleteFramework = (frameworkId, errorCallback, successCallback) => {
  siteCall(
    authConfig.delete_framework + '/' + frameworkId,
    'DELETE',
    {},
    res => {
      if (res?.data?.error?.msg) {
        console.log('deleteFramework error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('deleteFramework success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const createFramework = (params, errorCallback, successCallback) => {
  siteCall(
    authConfig.new_framework,
    'POST',
    params,
    res => {
      if (res?.data?.error?.msg) {
        console.log('createFramework error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('createFramework success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}

export const updateFramework = (id, params, errorCallback, successCallback) => {
  siteCall(
    authConfig.edit_framework + '/' + id,
    'PUT',
    params,
    res => {
      if (res?.data?.error?.msg) {
        console.log('updateFramework error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('updateFramework success:', res.data)
        successCallback(res.data)
      }
    },
    error => {
      errorCallback(error)
    }
  )
}
