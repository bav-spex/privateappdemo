//*Axios
import axios from 'axios'
//.config
import authConfig from 'src/configs/auth';
import { siteCall } from 'src/util/web_call';

export const deleteControl = (id, errorCallback, successCallback) => {
  siteCall(authConfig.delete_control + '/' + id, "DELETE", {}, (res) => {
      if (res?.data?.error) {
          console.log('deleteControl error:', res.data)
          if (errorCallback) errorCallback(res.data.error)
      } else {
          console.log('deleteControl success:', res.data)
          successCallback(res.data)
      }
  }, (error) => {
      errorCallback(error);
  });
}

export const getControlList = (errorCallback, successCallback) => {
  siteCall(authConfig.controlList, "GET", {}, (res) => {
      if (res?.data?.error?.msg) {
          console.log('getControlList error:', res.data)
          if (errorCallback) errorCallback(res.data.error)
      } else {
          console.log('getControlList success:', res.data)
          successCallback(res.data)
      }
  }, (error) => {
      errorCallback(error);
  });
}
