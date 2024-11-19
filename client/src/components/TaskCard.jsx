import { Link } from "react-router-dom"

export function TaskCard({ task }) {
    return (
        <li style={{padding: "1rem"}}>
            <div>
            <Link to={`/tasks/${task.id}`}>
                <h1>{task.title}</h1>
            </Link>
            <p>{task.description}</p>
            </div>
            <hr />
        </li>
    )
}