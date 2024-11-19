import { useForm } from 'react-hook-form'
import { login } from '../api/user.api'
import { useNavigate } from 'react-router-dom'

export function LoginFormPage() {

    const { 
        register, 
        handleSubmit, 
        formState: { errors }
     } = useForm()

    const navigate = useNavigate()

    const onSubmit = handleSubmit(async data => {
        try {
            const res = await login(data)
            navigate("/tasks")
            navigate(0)
        } catch(e) {
            alert("Don't work!!!")
        }
    })

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="username"
                    {...register("username", { required: true })}
                />
                {errors.username && <span>This fields is required</span>}
                <br />
                <input 
                    type="password" 
                    placeholder="password"
                    {...register("password", { required: true })}
                />
                {errors.password && <span>This fields is required</span>}
                <br />
                <button>Login</button>
            </form>
        </div>
    )
}