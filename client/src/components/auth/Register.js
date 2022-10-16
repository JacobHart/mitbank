import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import axios from 'axios';
import { setAlert, removeAlert } from '../../features/alert/alertSlice'
import { registerSuccess, registerFail } from '../../features/auth/authSlice'
import {loadUser} from '../../features/auth/auth'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})
    const dispatch = useDispatch()
    const onSubmit = async e => {

        
        e.preventDefault(); 

        if(password !== password2) {

            const id = nanoid();
            dispatch(
                setAlert({
                  id: id,
                  msg: 'Passwords do not match',
                  alertType: 'danger'
                })
            )

            setTimeout(() => dispatch( removeAlert(id)), 5000);

        } else {
            
            const config = {
                headers: {
                    'Content-Type': 'application/json'
            }
        }
            
        const body = JSON.stringify({ name, email, password });
             
        try {
                const res = await axios.post('/api/users', body, config);
                dispatch(registerSuccess(res.data));
                dispatch(loadUser())

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

                dispatch(registerFail())
            
            }}}
              
        // redirect if logged in

        const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
        if(isAuthenticated){
            return <Navigate to="/" />
        }
        
    
    return (
        <section className="container">
        <div>
            
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={ e => onSubmit(e)}>
                    
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Name" 
                            name="name" 
                            value={name}
                            onChange={e => onChange(e)}
                            />
                    </div> 
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
                    />
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                    />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            
        </div>
        </section>
    )
}


export default Register