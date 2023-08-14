//*Axios
import { responsiveFontSizes } from '@mui/material'
import axios from 'axios'
//.config
import authConfig from 'src/configs/auth'

export const getClaimsData = (errorCallback, successCallback) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  axios
    .get(`${authConfig.authDevRakshitah_base_url}roles/claims`, {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
    .then(res => {
      if (res.data.error) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const getRolesData = (errorCallback, successCallback) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  axios
    .get(`${authConfig.authDevRakshitah_base_url}roles`, {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
    .then(res => {
      if (res.data.error) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const addRoleData = payload => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  axios
    .post(`${authConfig.authDevRakshitah_base_url}roles`, payload, {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
    .then(res => {
      console.log('resp', res.data)
      if (res.data.error) {
        console.log('error:', res.data)
      } else {
        getRolesData()
      }
    })
    .catch(err => console.log('error', err))
}

export default addRoleData
