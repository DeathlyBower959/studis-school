import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AccountContext from '../../contexts/AccountContext'

const RequireAuth = () => {
  const { isLoggedIn } = useContext(AccountContext)
  const location = useLocation()

  if (isLoggedIn() === 0) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default RequireAuth
