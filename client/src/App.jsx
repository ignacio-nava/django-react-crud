import { 
  BrowserRouter, Routes, Route, Navigate
 } from 'react-router-dom'
import { TasksPage } from './pages/TasksPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { LoginFormPage } from './pages/LoginFormPage'
import { Navigation } from './components/Navigation'
import { useState, useEffect } from 'react'
import { getUser } from './api/user.api'


function App() {

  const [currentUser, setCurrentUser] = useState(false) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await getUser()      
        setCurrentUser(res.data.user)
      } catch(e) {
        setCurrentUser(false)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <BrowserRouter>
      <Navigation user={currentUser}/>

      <Routes>
        {/* Ruta por defecto. Redirige a tasks si hay un usuario, si no al login */}
        <Route path="/" element={<Navigate to="/tasks"/>} />

        {/* Ruta de login */}
        <Route path="/login" element={<LoginFormPage />} />

        {/* Rutas protegidas */}
        <Route 
          path="/tasks" 
          element={currentUser ? <TasksPage user={currentUser} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/tasks-create"
          element={currentUser ? <TaskFormPage user={currentUser} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/tasks/:id"
          element={currentUser ? <TaskFormPage user={currentUser} /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App