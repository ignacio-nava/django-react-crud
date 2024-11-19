import { useState, useEffect } from 'react'
import { getAllTasks } from '../api/tasks.api'
import { TaskCard } from './TaskCard'


export function TasksList() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function loadTasks() {
            try {
                const res = await getAllTasks()
                setTasks(res.data)
            } catch (e) {
                return
            }
        }

        loadTasks()
    }, [])

    const tasksElement = tasks && tasks.map(task => (
        <TaskCard 
            key={task.id}
            task={task}
        />
    ))

    return (
        <div>
            <ul>{tasksElement}</ul>
        </div>
    )
}