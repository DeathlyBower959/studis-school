import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AccountContext from '../../contexts/AccountContext'
import Spinner from '../Loaders/Spinner'

const RequireAuth = () => {
  const { isLoggedIn } = useContext(AccountContext)
  const location = useLocation()

  if (isLoggedIn() === 0) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (isLoggedIn() === 2)
    return (
      <div
        style={{
          width: '100%',
          height: '80%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Spinner height="3em" />
      </div>
    )

  return <Outlet />
}

export default RequireAuth
