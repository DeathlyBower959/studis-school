import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation} from 'react-router-dom'
import AccountContext from '../../contexts/AccountContext'

const NoAuth = () => {
  const { isLoggedIn } = useContext(AccountContext)
  const {state} = useLocation()

  if (isLoggedIn() === 1) {
    return <Navigate to={state?.from?.pathname || '/'}/>
  }

  return <Outlet />
}

export default NoAuth
