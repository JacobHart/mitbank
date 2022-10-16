import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'



const authLinks = (
  <>
  <p className="lead">
    Ready to make a deposit
  </p>
  <div className="buttons">
      <Link to='/deposit' className='btn btn-primary'>Deposit</Link>
      <Link to='/withdraw' className='btn btn-light'>Withdraw</Link>
  </div>
  </>
);

const guestLinks= (
  <>
  <p className="lead">
    Sign up and immediately start to withdraw and deposit money 
  </p>
  <div className="buttons">
      <Link to='/register' className='btn btn-primary'>Register</Link>
      <Link to='/login' className='btn btn-light'>Login</Link>
  </div>
  </>
);
const Landing = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const loading = useSelector(state => state.auth.loading)

    return (
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Bad Bank</h1>

            { !loading && (<>{ isAuthenticated ? authLinks : guestLinks }</>)}
          </div>
        </div>
      </section>
    )
}

export default Landing