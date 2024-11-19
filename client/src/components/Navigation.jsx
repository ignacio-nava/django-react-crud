import { Link } from "react-router-dom"
import { logout } from "../api/user.api"
import { useNavigate } from 'react-router-dom'


export function Navigation(props) {
    const navigate = useNavigate()

    const styleDiv = {
        display: "flex",
        alignItems: "baseline",
        gap: "1rem"
    }

    async function logoutHandle() {
        const want_logout = window.confirm("Logout?")
        if (want_logout) {
            await logout()
            navigate("/tasks")
            navigate(0)
        }
    }

    const loggedElement = 
    <div>
        <span>{props.user.username}</span>
        <button 
            onClick={logoutHandle}
            style={{cursor: 'pointer', marginLeft: '1rem'}}
        >
            Logout
        </button>
    </div>

    const notLoggedElement = 
    <div>
        <Link to="/login">Login</Link>
    </div>
    
    const userElement = props.user ?  loggedElement : notLoggedElement

    return (
        <div style={styleDiv}>
            <Link to="/tasks">
                <h1>Task App</h1>
            </Link>
            <Link to="/tasks-create">Create Tasks</Link>
            {userElement}
        </div>
    )
}