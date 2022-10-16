import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import axios from 'axios';
import { setAlert, removeAlert } from '../../features/alert/alertSlice'
import { loginSuccess, loginFail } from '../../features/auth/authSlice'
import {loadUser} from '../../features/auth/auth'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})
    const dispatch = useDispatch()
    const onSubmit = async e => {
        e.preventDefault(); 

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const body = JSON.stringify({email, password});
         
        try {
            const res = await axios.post('/api/auth', body, config);
            dispatch(loginSuccess(res.data));
            dispatch(loadUser())
            const id = nanoid();
            dispatch(setAlert({
                id: id,
                msg: "Login Success",
                alertType: 'success'
            }))
            setTimeout(() => dispatch( removeAlert(id)), 5000);

        } catch (err) {
        
            const errors = err.response.data.errors;
            if(errors) {

                errors.forEach(error => {
                    const id = nanoid();
                    dispatch(setAlert({
                        id: id,
                        msg: error.msg,
                        alertType: 'danger'
                    }))
                    setTimeout(() => dispatch( removeAlert(id)), 5000);
                });
            }

            dispatch(loginFail())
        
        }}
    
        // redirect if logged in

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    if(isAuthenticated){
        return <Navigate to="/deposit" />
    }
    
    return (
            <div>
            
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead">Sign Into Your Account</p>
                <form className="form" onSubmit={ e => onSubmit(e)}>
                    
                 
                    <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value={email}
                        onChange={e => onChange(e)}
                        />
                    </div> 
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                    />
                    </div>

                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to='/register'>Sign Up</Link>
                </p>
            
        </div>
    )
}


export default Login