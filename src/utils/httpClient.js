import axios from 'axios';

 export const BASE_PATH = 'http://localhost:8000/adminPortal';
 export const BASE_URL_PATH = 'http://localhost:8000';
// export const BASE_PATH = 'https://byrds-backend.azurewebsites.net/adminPortal';
// export const BASE_URL_PATH = 'https://byrds-backend.azurewebsites.net';

const axiosClient = axios.create({
    baseURL: BASE_PATH
})

axiosClient.interceptors.request.use(
    function (response) {
        const access_token = localStorage.getItem('byrdstoken');
        Object.assign(response.headers, {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + access_token,
        })
        // console.log('interceptor1', response);
        return response;
    },
    function (error) {
        console.log('interceptor2', error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (response) {
        // console.log('intrresp', response);
        return response;
    },
    function (error) {
        console.log('interceerror', error);
        // if(error.response.status === 401 || error.response.status === 403) window.location.href = '/login'
        return Promise.reject(error);
    }
)

export default axiosClient;