import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getLocalAccessToken() {
    const accessToken =await AsyncStorage.getItem('token')
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
            config.headers["Authorization"] = `Bearer ${token}`;
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
