import authConfig from 'src/configs/auth'
import apiHelper from 'src/store/apiHelper'
// https://iac-rakshitah-dev.politeforest-c2818b6a.southeastasia.azurecontainerapps.io/iam/teams

// Moxk API
export const getTeamDropDown = (successCallback, errorCallback) => {
  apiHelper(authConfig.team_list, 'get')
    .then(res => {
      successCallback(res.data.data.users)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getAdditionlStakeHoldersDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.authDevRakshitah_base_url}users/getAll`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getNextStepsDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/25`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getCategoryDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/12`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getAuditStatusDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/26`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getRiskSourceDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/13`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getSiteLocationDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/14`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getRiskScoreDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/15`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getCurrentLikelyHoodDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/16`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getCurrentImpactDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/17`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getAffectedAssetsDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/18`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getTechnologyDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/19`, 'get')
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

export const getStrategyDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/21`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getEffortsDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/22`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getRiskDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/28`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getThreatDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.commonDevRakshitah_base_url}category/29`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getControlDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.governanceDevRakshitah_base_url}controls/get`, 'get')
    .then(res => {
      successCallback(res.data.data.controls)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getControlRegulationDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.governanceDevRakshitah_base_url}frameworks/getAll`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const getFrameworkDropDown = (successCallback, errorCallback) => {
  apiHelper(`${authConfig.governanceDevRakshitah_base_url}frameworks/getAll`, 'get')
    .then(res => {
      successCallback(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}
