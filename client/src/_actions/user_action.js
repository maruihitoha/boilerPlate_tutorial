import axios from 'axios'
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types'

export function loginUser(dataToSubmit)
{
    // Axios.post로 백엔드로 보내줌
    const request = axios.post('/api/users/login', dataToSubmit).then(response =>  response.data );

    // reducer로 리턴
    // 리듀서에서 previous 스테이트와 현재의 액션을 조합해서
    // 다음 스테이트를 만들어줌
    return {
        type : LOGIN_USER, // types.js에서 가져옴
        payload : request
    }
}

export function registerUser(dataToSubmit)
{
    // Axios.post로 백엔드로 보내줌
    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response =>  response.data );

    // reducer로 리턴
    // 리듀서에서 previous 스테이트와 현재의 액션을 조합해서
    // 다음 스테이트를 만들어줌
    return {
        type : REGISTER_USER, // types.js에서 가져옴
        payload : request
    }
}

export function auth()
{
    // Axios.post로 백엔드로 보내줌
    const request = axios.get('/api/users/auth')
    .then(response =>  response.data );

    // reducer로 리턴
    // 리듀서에서 previous 스테이트와 현재의 액션을 조합해서
    // 다음 스테이트를 만들어줌
    return {
        type : AUTH_USER, // types.js에서 가져옴
        payload : request
    }
}