import React from 'react'
import SideBar from './SideBar'
import NavBar from './NavBar'

const AppLayout = ({children, setIsLoggedIn}) => {
  return (
     <div className="flex h-screen bg-gray-100">
      <SideBar/>
      <div className="flex flex-col flex-1 pl-16 overflow-hidden">
        <NavBar setIsLoggedIn={setIsLoggedIn}/>
        <main className="flex-1 overflow-y-auto p-3 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout
