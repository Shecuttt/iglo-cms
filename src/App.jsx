import { Routes, Route } from 'react-router-dom'

import UserManage from './pages/UserManage'
import Dashboard from './pages/Dashboard'
import AddUser from './pages/AddUser'
import Login from './pages/Login'
import UserLog from './pages/UserLog'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/usermanage' element={<UserManage />} />
        <Route path='/userlog' element={<UserLog />} />
        <Route path='/adduser' element={<AddUser />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
