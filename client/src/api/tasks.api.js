import axios from 'axios'
import { getCSRFToken } from './user.api';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/'
})

export const getAllTasks = () => tasksApi.get('/')
export const getTask = id => tasksApi.get(`/${id}/`)
export const createTask = task => {
    const csrfToken = getCSRFToken()
    return tasksApi.post('/', task, {
        headers: {
            'X-CSRFToken': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        withCredentials: true,
    })
}
export const updateTask = (id, task) => {
    const csrfToken = getCSRFToken()
    return tasksApi.put(`/${id}/`, task, {
        headers: {
            'X-CSRFToken': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        withCredentials: true,
    })
}
export const deleteTask = id => {
    const csrfToken = getCSRFToken()
    return tasksApi.delete(`/${id}/`, {
        headers: {
            'X-CSRFToken': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        withCredentials: true,
    })
}