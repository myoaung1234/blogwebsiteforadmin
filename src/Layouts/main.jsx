import React from 'react'
import { Outlet } from "react-router-dom";
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import ProtectedRoute from '../ProtectedRoute';


const Main = () => {
  
  return (
    <ProtectedRoute>
          <SideBar>
            <Header />
            <Outlet/>
          </SideBar>
    </ProtectedRoute>
  )
}

export default Main

