//*Axios
import axios from 'axios'
//.config
import authConfig from 'src/configs/auth';

export const deleteControl = (id, errorCallback, successCallback) => {
  axios
    .delete(authConfig.delete_control + '/' + id)
    .then(res => {
      if (res.data.error) {
        console.log('error:', res.data)
        if (errorCallback) errorCallback(res.data.error)
      } else {
        successCallback(res.data);
      }
    })
    .catch(err => (errorCallback ? errorCallback(err) : null))
}
