import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

const client = axios.create({
    // baseURL: "http://localhost:8000/user/"
    baseURL: "https://navaignacio.pythonanywhere.com/user/"
})

export const getCSRFToken = (fromRequest=false) => {
    if (fromRequest) {
        return client.get('get-csrf/')
    }
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
}

export const getUser = async () => {
    const csrfToken = await getCSRFToken(true)
    return client.get('user/', {}, {
        headers: {
            'X-CSRFToken': csrfToken.data.csrfToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
    })
}
export const login = user => client.post('login/', user)

export const logout = async () => {
    const csrfToken = await getCSRFToken(true)
    return client.post('logout/', {}, {
        headers: {
            'X-CSRFToken': csrfToken.data.csrfToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
    })
}

