//*Axios
import axios from 'axios'
//.config
import authConfig from 'src/configs/auth';
import { siteCall } from 'src/util/web_call';

export const fetchRisk = (id, errorCallback, successCallback) => {
  siteCall(authConfig.riskListEndPoint +"/"+ id, "GET", {}, (res) => {
      if (res?.data?.error?.msg) {
          console.log('fetchRisk error:', res.data)
          if (errorCallback) errorCallback(res.data.error.msg)
      } else {
          console.log('fetchRisk success:', res.data)
          successCallback(res.data)
      }
  }, (error) => {
      errorCallback(error);
  });
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
    siteCall(authConfig.saveAllRisk, "POST", params, (res) => {
        if (res?.data?.error?.msg) {
            console.log('saveRisk error:', res.data)
            if (errorCallback) errorCallback(res.data.error.msg)
        } else {
            console.log('saveRisk success:', res.data)
            successCallback(res.data)
        }
    }, (error) => {
        errorCallback(error);
    });
}

export const updateRisk = (id, params, errorCallback, successCallback) => {
  console.log("ID:", id, 'params:', params)
  siteCall(authConfig.edit_risk + "/" + id, "PUT", params, (res) => {
      if (res?.data?.error?.msg) {
          console.log('updateRisk error:', res.data)
          if (errorCallback) errorCallback(res.data.error.msg)
      } else {
          console.log('updateRisk success:', res.data)
          successCallback(res.data)
      }
  }, (error) => {
      errorCallback(error);
  });
}

export const allRisk = (errorCallback, successCallback) => {
  siteCall(authConfig.riskAll, "GET", {}, (res) => {
      if (res?.data?.error?.msg) {
          console.log('getRisks error:', res.data)
          if (errorCallback) errorCallback(res.data.error.msg)
      } else {
          console.log('getRisks success:', res.data)
          successCallback(res.data)
      }
  }, (error) => {
      errorCallback(error);
  });
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
