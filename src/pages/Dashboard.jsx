import React from 'react'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'

const Dashboard = () => {
  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar />
      {/* Main */}
      <main className='w-full bg-red-50'>
        <TopNav />
      </main>
    </div>
  )
}

export default Dashboard