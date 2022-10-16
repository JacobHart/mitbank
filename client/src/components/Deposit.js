import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import axios from 'axios';
import { setAlert, removeAlert } from '../features/alert/alertSlice'
import {loadUser} from '../features/auth/auth'
import Moment from 'react-moment'

const Deposit = () => {
    const [value, setValue] = useState();

    
    const transacions =  useSelector(state => state.auth.user.transaction)
    console.log(transacions)

    const renderedTransactions = transacions.slice(0, 5).map(transaction => (
        <tr className={ transaction.value > 0 ? "text-success" : "text-danger" } key={transaction.id}>
            <td>{transaction.value}</td>
            <td><Moment fromNow>{transaction.date}</Moment></td>
        </tr>
      ))

    const user = useSelector(state => state.auth.user)
    const onChange = e => setValue(e.target.value)
    const dispatch = useDispatch()
    const onSubmit = async e => {

        e.preventDefault(); 
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
            
        const body = JSON.stringify({ value });
             
        try {
                const res = await axios.put('api/users/transaction', body, config);
                dispatch(loadUser())
                console.log(res)
                const id = nanoid();
                dispatch(setAlert({
                    id: id,
                    msg: "Transaction Received",
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
            
            }}
              
        // redirect if logged in

        const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
        if(!isAuthenticated){
            return <Navigate to="/" />
        }
        
    
    return (
        <>
      <h1 className="large text-primary">Deposit</h1>
      <p className="lead">
         New transacion
      </p>
      <div className="profiles">
        <div className="profile bg-light">
          
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>Current balance: {user.balance}</p>
          </div>

          <form className="form" onSubmit={ e => onSubmit(e)}>
                    
                 
                    <div className="form-group">
                    <input 
                        type="number" 
                        step="0.01"
                        min="0"
                        placeholder="Transaction amount" 
                        name="value" 
                        value={value}
                        onChange={e => onChange(e)}
                        />
                    </div> 


                    <input type="submit" className="btn btn-success" value="Deposit" />
                </form>


                <table class="table">
        <thead>
          <tr>
            <th colspan="2">Latest Transactions</th>
          </tr>
        </thead>
        <tbody>
            {renderedTransactions}
 
        </tbody>
      </table>

         
        </div>


      </div>
      </>
        )
    }
    
    
    export default Deposit