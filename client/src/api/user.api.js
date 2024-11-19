export const getCSRFToken = () => {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
}


import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

const client = axios.create({
    baseURL: "http://localhost:8000/user/"
})

export const getUser = () => {
    const csrfToken = getCSRFToken()
    return client.get('user/', {}, {
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
    })
}
export const login = user => client.post('login/', user)

export const logout = () => {
    const csrfToken = getCSRFToken()
    return client.post('logout/', {}, {
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
    })
}

