import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getLocalAccessToken() {
    const accessToken =await AsyncStorage.getItem('token')
    console.log('token is')
    console.log(accessToken)
    return accessToken;
}

function getLocalRefreshToken() {
    const refreshToken = AsyncStorage.getItem('refreshToken')
    return refreshToken;
}

const instance = axios.create({
    baseURL: 'http://api.tennisland.org:3000',
    headers: {
        "Content-Type": "application/json",
        "accept" : "*/*",
        'Access-Control-Allow-Origin':'*',
    },
});
instance.interceptors.request.use(
    async (config) => {
        const token = await  getLocalAccessToken();
        if (token) {
             config.headers["Authorization"] = `Bearer ${token}`
            //config.headers["Authorization"] = 'Bearer eyJraWQiOiJSTWh2KzJldlIxckM2NDhacjF1dW1LTGZIN3FrNTBya2N5UFZ5QjZxNXZZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4MTJiZDY4OS05ZDIxLTRhODgtYjhiNS1mZTllOTNiYmJlNTgiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0xX0xwYXBKYVlWdSIsImNvZ25pdG86dXNlcm5hbWUiOiJtb2luYXlhemlmYXIiLCJvcmlnaW5fanRpIjoiOGMxMzIwMGQtY2YwZi00MTgwLWJmMWQtOGQ1NjQ4M2I2Nzc4IiwiYXVkIjoiamkycWNmNjd2bGdlY2pldWw5ZG5tazkwZiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjY3NDAyODI5LCJleHAiOjE2Njc0MDY0MjksImlhdCI6MTY2NzQwMjgyOSwianRpIjoiYjczOTQyMDktYmNiNy00YjdmLWE5MmUtNjBiZWNiZTU0MWQ4IiwiZW1haWwiOiJtb2luYXlhemlmYXJAZ21haWwuY29tIn0.v9qn_gtq6vc4GeLsASP9y1-tbU9HJfDFP9R40rxI_DrT0HCxs7RhVJoudlW48TPF-1FnECpf3rOWPaAPvgVzuZORoklj1Il9001FhvYJYIKq_k5nm-eevjyidwukvx867kVP-NTyCl5AUkf0hWgH_pJ7j4c7aZ7_QCrwxCGUhGjuS_apPNcH3kDut7lqvnHCf4Xo3oC2PNit8fGSTuoSk0AA2sn51xvVedg8zTXdb-7OcX2vjUWKyHdFpcdGLYRPjKG-4bqTqrhGqd3lUyYaLuDJuu-ccKp5QmaZRmtVB00DgtNrbMad9KNNsUNNUxuGt5cpA-IT4Tbgj6oj5mQRwg'
            // config.headers["Authorization"] = 'Bearer eyJraWQiOiJSTWh2KzJldlIxckM2NDhacjF1dW1LTGZIN3FrNTBya2N5UFZ5QjZxNXZZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1MTJjY2ZmZC04ZjNlLTRlYTktOWQ3Mi00NzRjZjExN2UyNjEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0xX0xwYXBKYVlWdSIsImNvZ25pdG86dXNlcm5hbWUiOiJhbGlnZXJhbWkiLCJvcmlnaW5fanRpIjoiNzhmYWExNzYtZGVhNy00YmEyLTk3OGMtMzYzOWM4ODRjYmZmIiwiYXVkIjoiamkycWNmNjd2bGdlY2pldWw5ZG5tazkwZiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjY3NDAwNTg5LCJleHAiOjE2Njc0MDQxODksImlhdCI6MTY2NzQwMDU4OSwianRpIjoiNTgyNzRiYWQtZGI1Yi00Y2VlLWJlZTAtN2JmNWQxOTFmYWM5IiwiZW1haWwiOiJhbGlnZXJhbWlAZ21haWwuY29tIn0.w1fQN56I9aXLQlSSHdKhU62B9NP-6foppl9n2fn96so5VWgN_4nTg5gRmaXxOPTJmuYAUfUVcdUcgq-a4G3eh76booC4xINSNCUMUwATBVJjHg6JB6_Xji-NN-UE8av5MUFDQFmqO9BqSMivXcY0yunY2rh1QB0HqZO-ix3SI6I2x1zS6r6qtl2v1reJ3OAjO_oeS6CCEAx4r2q-0K3N1O85RWYE6lFBk5hrGkdgIxJcmmjz5IHZ_maemaiOKJUHw7STdAfZthMLTjf_xXPpVuAR7qWmwUyGW_WeVZRaWfRG4aXt80UjtGbLFRl84ciqHGgCteTM4PohK-pQzvZJyw'
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

function refreshToken() {
    const refreshToken = localStorage.getItem("refresh");
    return  axios.post('http://185.110.188.97:8000/auth/token/refresh/', JSON.stringify({refresh:refreshToken}),{
        headers:{
            "Content-Type": "application/json",
        }
    })

}

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {

                originalConfig._retry = true;
                return
                try {
                    const rs = await refreshToken();
                    const {access} = rs.data;
                    localStorage.setItem("token", access);
                    instance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
                    return instance(originalConfig);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        localStorage.removeItem('token')
                        localStorage.removeItem('refresh')
                        window.location = (config.DOMIN)
                        return Promise.reject(_error.response.data);
                    }
                    return Promise.reject(_error);
                }
            }
            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }
        return Promise.reject(err);
    }
);
export default {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
    patch: instance.patch
};
