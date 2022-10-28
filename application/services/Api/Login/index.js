import axios from "axios";




export const LoginApi=(data)=> axios({
    method: 'post',
    url: 'http://api.tennisland.org:3000/auth/login',
    headers: {
        'Content-Type': 'application/json'
    },
    data : data
})
