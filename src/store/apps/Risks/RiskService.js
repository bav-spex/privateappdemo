//*Axios
import axios from 'axios'
//.config
import authConfig from 'src/configs/auth'

export const fetchRisk = (params, errorCallback, successCallback) => {
  axios
    .get(authConfig.riskListEndPoint, `${params}`)
    .then(res => {
      if (res.data.error.msg != '') {
        console.log('error : ', res.data.error)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('successing : ', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const category = (errorCallback, successCallback) => {
  axios
    .get(authConfig.riskCategory)
    .then(res => {
      console.log('newcategory:', res.data)
      if (res.data.error) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('category:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const riskSourceA = (errorCallback, successCallback) => {
  axios
    .get(authConfig.riskSource)
    .then(res => {
      // console.log('RiskSource:', res.data)
      if (res.data.error) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('riskSource:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const SiteLocations = (params, errorCallback, successCallback) => {
  axios
    .get(authConfig.siteLocation, `${params}`)
    .then(res => {
      if (res.data.error) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('siteLocation:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const RiskScore = (errorCallback, successCallback) => {
  axios
    .get(authConfig.scoreRisk)
    .then(res => {
      if (res.data.error) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('scoreRisk:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const currentlikehood = (errorCallback, successCallback) => {
  axios
    .get(authConfig.currentLike)
    .then(res => {
      if (res.data.error) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('current:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const currentImpacts = (errorCallback, successCallback) => {
  axios
    .get(authConfig.currentImpact)
    .then(res => {
      console.log('Current_Impact:', res.data)
      if (!res.data) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('cI:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const fetchAssets = (errorCallback, successCallback) => {
  axios
    .get(authConfig.affectedAssets)

    .then(res => {
      if (res.data.error) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('assets:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const fetchTechnology = (errorCallback, successCallback) => {
  axios
    .get(authConfig.technlogy)
    .then(res => {
      if (res.data.error) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('tech:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const fetchOwner = (errorCallback, successCallback) => {
  axios
    .get(authConfig.owner_list)
    .then(res => {
      console.log('owner list:', res.data)
      successCallback(res.data.users)
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const saveRisk = (params, errorCallback, successCallback) => {
  console.log('params:', params)
  axios
    .post(authConfig.saveAllRisk, params)
    .then(res => {
      if (res.data.error.msg != '') {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('allSave:', res.data)
        successCallback(res.body.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const allRisk = (errorCallback, successCallback) => {
  axios
    .get(authConfig.riskAll)
    .then(res => {
      if (res.data.error.msg != '') {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        // console.log('allrisk:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const allAudits = (errorCallback, successCallback) => {
  axios
    .get('https://9d9560c9-7f96-4865-9747-d5a8232c9a70.mock.pstmn.io//rmf/v1/audits')
    .then(res => {
      if (res.data.error.msg != '') {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        console.log('url:', authConfig.auditAll)
        console.log('allaudits:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const allReview = (errorCallback, successCallback) => {
  axios
    .get(authConfig.getmanagmentReview)
    .then(res => {
      if (res.data.error.msg != '') {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}
