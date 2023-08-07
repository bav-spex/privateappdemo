import axios from 'axios'
import auth from 'src/configs/auth'

const apiHelper = async (apiURL, method, data, token) => {
  const storedToken = window.localStorage.getItem(auth.storageTokenKeyName)

  let url = apiURL

  let headers = {
    Authorization: `Bearer ${storedToken}`
  }

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default apiHelper
