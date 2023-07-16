// *Axios
import axios from 'axios'
//*config
import authConfig from 'src/configs/auth'

export const createAssessment = (params, errorCallback, successCallback) => {
  console.log(params)
  axios
    .post(authConfig.add_assessment, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('createAssessment error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('createAssessment success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const updateAssessment = (params, errorCallback, successCallback) => {
  console.log(params)
  axios
    .post(authConfig.update_assessment, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('updateAssessment error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('updateAssessment success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const getTestAssessments = (id, errorCallback, successCallback) => {
  axios
    .get(authConfig.get_test_data_by_id + id + '/assessments')
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('getTestAssessments error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('getTestAssessments success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const getAssessmentById = (id, action, errorCallback, successCallback) => {
  axios
    .get(authConfig.get_assessment_by_id + id + '/testresult/' + action)
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('getAssessmentById error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('getAssessmentById success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const getTests = (errorCallback, successCallback) => {
  axios
    .get(authConfig.get_tests)
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('getTests error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('getTests success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}

export const addComment = (params, errorCallback, successCallback) => {
  console.log(params)
  axios
    .post(authConfig.add_assessment_comment, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res?.data?.error?.msg) {
        console.log('addComment error:', res.data)
        if (errorCallback) errorCallback(res.data.error.msg)
      } else {
        console.log('addComment success:', res.data)
        successCallback(res.data)
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}
