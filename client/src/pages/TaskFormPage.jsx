import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createTask, getTask, deleteTask, updateTask } from '../api/tasks.api'
import { useNavigate, useParams } from 'react-router-dom'


export function TaskFormPage(props) {

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        setValue
     } = useForm()

    const navigate = useNavigate()
    const params = useParams()

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            try {
                await updateTask(params.id, {...data, owner: props.user.id})
            } catch (e) {
                console.log(e)
                return alert('Not Updated')
            }
        } else {
            try {
                await createTask({...data, owner: props.user.id})
            } catch (e) {
                console.log(e)
                return alert('Not Created')
            }
        }
        navigate("/tasks")
    })

    useEffect(() => {
        async function loadTask() {
            try {
                const res = await getTask(params.id)
                setValue('title', res.data.title)
                setValue('description', res.data.description)
            } catch (e) {
                navigate("/tasks")
            }
        }

        params.id && loadTask()
    }, [])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="title"
                    {...register("title", { required: true })}
                />
                {errors.title && <span>This fields is required</span>}
                <br />
                <textarea 
                    rows="3" 
                    placeholder="description"
                    {...register("description", { required: true })}
                ></textarea>
                {errors.description && <span>This fields is required</span>}
                <button>Save</button>
            </form>

            {
                params.id && 
                <button onClick={async () => {
                    const accepted = window.confirm('Are you sure?')
                    if (accepted) {
                        try {
                            await deleteTask(params.id)
                        } catch (e) {
                            console.log(e)
                            return alert('Not Deleted')
                        }
                        navigate("/tasks")
                    }
                }}>Delete</button>
            }
        </div>
    )
}