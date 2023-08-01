// *Axios
import axios from 'axios'
//*config
import authConfig from 'src/configs/auth';
import { siteCall } from 'src/util/web_call';

export const createAssessment = (params, errorCallback, successCallback) => {
    siteCall(authConfig.add_assessment, "POST", params, (res) => {
        if (res?.data?.error?.msg) {
            console.log('createAssessment error:', res.data)
            if (errorCallback) errorCallback(res.data.error.msg)
        } else {
            console.log('createAssessment success:', res.data)
            successCallback(res.data)
        }
    }, (error) => {
        errorCallback(error);
    });
}

export const updateAssessment = (params, errorCallback, successCallback) => {
    console.log(params);
    siteCall(authConfig.update_assessment, "POST", params, (res) => {
        if (res?.data?.error?.msg) {
            console.log('updateAssessment error:', res.data)
            if (errorCallback) errorCallback(res.data.error.msg)
        } else {
            console.log('updateAssessment success:', res.data)
            successCallback(res.data)
        }
    }, (error) => {
        errorCallback(error);
    });
}

export const getTestAssessments = (id, errorCallback, successCallback) => {
    siteCall(authConfig.get_test_data_by_id + id +'/assessments', "GET", {}, (res) => {
        if (res?.data?.error?.msg) {
            console.log('getTestAssessments error:', res.data)
            if (errorCallback) errorCallback(res.data.error.msg)
        } else {
            console.log('getTestAssessments success:', res.data)
            successCallback(res.data)
        }
    }, (error) => {
        errorCallback(error);
    });
}

export const getTestById = (id, errorCallback, successCallback) => {
    siteCall(authConfig.get_test_data_by_id + id +'/get', "GET", {}, (res) => {
        if (res?.data?.error?.msg) {
            console.log('getTestById error:', res.data)
            if (errorCallback) errorCallback(res.data.error.msg)
        } else {
            console.log('getTestById success:', res.data)
            successCallback(res.data)
        }
    }, (error) => {
        errorCallback(error);
    });
}

export const getAssessmentInfoById = (id, action, errorCallback, successCallback) => {
    siteCall(authConfig.get_assessment_by_id + id +'/testresult/' + action, "GET", {}, (res) => {
        if (res?.data?.error?.msg) {
            console.log('getAssessmentInfoById error:', res.data)
            if (errorCallback) errorCallback(res.data.error.msg)
        } else {
            console.log('getAssessmentInfoById success:', res.data)
            successCallback(res.data)
        }
    }, (error) => {
        errorCallback(error);
    });
}

export const getTests = (errorCallback, successCallback) => {
    siteCall(authConfig.get_tests, "GET", {}, (res) => {
        if (res?.data?.error?.msg) {
            console.log('getTests error:', res.data)
            if (errorCallback) errorCallback(res.data.error.msg)
        } else {
            console.log('getTests success:', res.data)
            successCallback(res.data)
        }
    }, (error) => {
        errorCallback(error);
    });
}

export const addComment = (params, errorCallback, successCallback) => {
    console.log(params);
    siteCall(authConfig.add_assessment_comment, "POST", params, (res) => {
        if (res?.data?.error?.msg) {
            console.log('addComment error:', res.data)
            if (errorCallback) errorCallback(res.data.error.msg)
        } else {
            console.log('addComment success:', res.data)
            successCallback(res.data)
        }
    }, (error) => {
        errorCallback(error);
    });
}

export const createTest = (params, errorCallback, successCallback) => {
    siteCall(authConfig.add_test, "POST", params, (res) => {
        if (res?.data?.error?.msg) {
            console.log('createTest error:', res.data)
            if (errorCallback) errorCallback(res.data.error.msg)
        } else {
            console.log('createTest success:', res.data)
            successCallback(res.data)
        }
    }, (error) => {
        errorCallback(error);
    });
}

export const updateTest = (id, params, errorCallback, successCallback) => {
    siteCall(authConfig.update_test + id, "POST", params, (res) => {
        if (res?.data?.error?.msg) {
            console.log('updateTest error:', res.data)
            if (errorCallback) errorCallback(res.data.error.msg)
        } else {
            console.log('updateTest success:', res.data)
            successCallback(res.data)
        }
    }, (error) => {
        errorCallback(error);
    });
}

export const saveExistingRisks = (params, errorCallback, successCallback) => {
    siteCall(authConfig.save_existing_list, "POST", params, (res) => {
        if (res?.data?.error?.msg) {
            console.log('saveExistingRisks error:', res.data)
            if (errorCallback) errorCallback(res.data.error.msg)
        } else {
            console.log('saveExistingRisks success:', res.data)
            successCallback(res.data)
        }
    }, (error) => {
        errorCallback(error);
    });
}