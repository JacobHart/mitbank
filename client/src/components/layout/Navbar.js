import React from 'react'
import { Link } from 'react-router-dom';
import { logOut } from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
    const dispatch = useDispatch()

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const loading = useSelector(state => state.auth.loading)

    const user = useSelector(state => state.auth.user)

    const authLinks = (
      <ul>
        <li><Link to='/deposit'>Deposit</Link></li>
        <li><Link to='/withdraw'>Withdraw</Link></li>
        <li><a onClick={() => dispatch(logOut())} href='#!'>Logout</a></li>
      </ul>
    );

    const guestLinks= (
      <ul>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
    );

    return (
      <nav className="navbar bg-dark">
        <h1>
          <a href="/">{ !loading && ( <>{ isAuthenticated ? `Account of ${user && user.name}` : "Bad Bank" }</>)}</a>
        </h1>
        { !loading && (<>{ isAuthenticated ? authLinks : guestLinks }</>)}

      </nav>
    )
}

export default Navbar

