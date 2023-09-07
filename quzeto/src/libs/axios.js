import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://quzeto.vercel.app/api',
    withCredentials: true,
})

export default axios;