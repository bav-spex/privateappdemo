//*Axios
import axios from 'axios'
import toast from 'react-hot-toast'
//.config
import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'

export const addNewRisk = (payload, successCallback, errorCallback) => {
  console.log('payload')
  apiHelper(`${authConfig.saveAllRisk}`, 'post', payload, {})
    .then(res => {
      toast.success(res.data.data.msg)
    })
    .catch(err => {
      console.log(err)
    })
}

export const updateRisk = (payload, errorCallback, successCallback) => {
  apiHelper(`${authConfig.edit_risk}/${payload.id}`, 'put', payload, {})
    .then(res => {
      console.log(res.data)
      // successCallback(res.data.data.risk)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getRisks = (errorCallback, successCallback) => {
  apiHelper(authConfig.riskAll, 'get', null, {})
    .then(res => {
      successCallback(res.data.data.risk)
    })
    .catch(err => {
      if (res.data.error.msg != '') {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        errorCallback ? errorCallback(err) : null
      }
    })
}

export const getSingleRisk = (id, errorCallback, successCallback, setLoading) => {
  apiHelper(`${authConfig.riskListEndPoint}/${id}`, 'get')
    .then(res => {
      successCallback(res.data.data)
      setLoading(false)
    })
    .catch(err => {
      if (res.data.error.msg != '') {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        errorCallback ? errorCallback(err) : null
      }
    })
}

export const getRiskDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.risk_mapping_list, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
      if (res.data.error.msg != '') {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        errorCallback ? errorCallback(err) : null
      }
    })
}

export const getThreatDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.threat_mapping_list, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
      if (res.data.error.msg != '') {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        errorCallback ? errorCallback(err) : null
      }
    })
}

export const getRiskSourceDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.riskSource, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
      if (res.data.error.msg != '') {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        errorCallback ? errorCallback(err) : null
      }
    })
}

export const getSiteLocationDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.siteLocation, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
      if (res.data.error.msg != '') {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        errorCallback ? errorCallback(err) : null
      }
    })
}

export const getRiskScoreDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.scoreRisk, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
      if (res.data.error.msg != '') {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        errorCallback ? errorCallback(err) : null
      }
    })
}

export const getCurrentLikelyHoodDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.currentLike, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
      if (res.data.error.msg != '') {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        errorCallback ? errorCallback(err) : null
      }
    })
}

export const getControlRegulationDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.regulation_dropdown, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
      if (res.data.error.msg != '') {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        errorCallback ? errorCallback(err) : null
      }
    })
}

export const getCurrentImpactDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.currentImpact, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
      if (res.data.error.msg != '') {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        errorCallback ? errorCallback(err) : null
      }
    })
}

export const getAffectedAssetsDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.affectedAssets, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
      if (res.data.error.msg != '') {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        errorCallback ? errorCallback(err) : null
      }
    })
}

export const getTechnologyDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.technlogy, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
      if (res.data.error.msg != '') {
        if (errorCallback) errorCallback(res.data.error)
      } else {
        errorCallback ? errorCallback(err) : null
      }
    })
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
