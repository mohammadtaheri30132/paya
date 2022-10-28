import axios from "axios"
import http from "../../httpServices"

export const profileApi = () => http.get('/user/profile')

export const profileApi2 = (data) => {
    console.log(data)
     return axios({
        method: 'get',
        url: 'http://api.tennisland.org:3000/user/profile',
        headers: {
            "Content-Type": "application/json",
            "accept": "*",
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${data}`
        },
    }) 
}
