// *Axios
import axios from 'axios';

const addToken = (headers) => {
    let accessToken = localStorage.getItem('accessToken') || null;
    console.log("accessToken:", accessToken);
    accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYXVkaXRvckBjbGllbnRvcmcuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2xvY2FsaXR5IjoiMSIsImp0aSI6Ijk4MGVkNGVjLWYwYTktNDUxZi05ZjMyLTIyNGZjZjc5OTM5NCIsImRhc2hib2FyZCI6InJlYWQiLCJmcmFtZXdvcmtzIjoicmVhZCIsImNvbnRyb2xzIjoicmVhZCIsImRvY3VtZW50cyI6InJlYWQiLCJyaXNrIjoicmVhZCIsImFzc2VzbWVudCI6InJlYWQiLCJhdWRpdHMiOiJyZWFkIiwibG9va3VwcyI6InJlYWQiLCJyb2xlcyI6InJlYWQiLCJ1c2VycyI6InJlYWQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIgdXNlciIsInRlYW1zIjoiIHsgVGVhbUlkID0gMSB9LCB7IFRlYW1JZCA9IDEgfSIsImV4cCI6MTc4NDczNDE2OCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.Gi03ik-TnLY9TPH0pi7LbNjjquFi9wzm8DGeyUMydks";
    if(accessToken != null && !("Authorization" in  headers)){
        headers["Authorization"] = `Bearer ${accessToken}`;
    }
    console.log("headers:", headers);
    return headers;
}

const addContentType = (headers, value) => {
    if(!("Content-Type" in  headers)){
        headers["Content-Type"] = value;
    }
    return headers;
}

export const siteCall = async(url, method, body, successCallback, errorCallback, headers) => {
    var method = method || "GET";
    var body = body || {};
    var headers = headers || {};
    headers = addToken(headers);
    headers = addContentType(headers, "application/json");

    return axios({
        method: method,
        url: url,
        headers: headers, 
        data: body
    })
    .then(response => {
        return successCallback(response);
    })
    .catch(error => { 
        return errorCallback(error);
     });
}