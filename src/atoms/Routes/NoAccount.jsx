import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AccountContext from '../../contexts/AccountContext'

const RequireAuth = () => {
  const { isLoggedIn } = useContext(AccountContext)
  const {state} = useLocation()

  if (isLoggedIn() === 1) {
    return <Navigate to={state?.from?.pathname || -1}/>
  }

  return <Outlet />
}

export default RequireAuth
