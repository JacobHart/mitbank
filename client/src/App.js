import './App.css';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Deposit from './components/Deposit'
import Withdraw from './components/Withdraw'
import Register from './components/auth/Register'
import store from './store'
import { Provider } from 'react-redux'
import { Alert } from './features/alert/Alert'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './features/auth/auth'



if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {


  useEffect(() => {
    store.dispatch(loadUser());

  }, []);
  return (

    <Provider store={store}>
      <Router>
        <Navbar/>
        <section className="container">
          
            <Alert  />
            <Routes>
              <Route exact path="/" element = { <Landing/> }/>
              <Route exact path="/register" element = { <Register/> }/>
              <Route exact path="/login" element = { <Login/> }/>
              <Route exact path="/deposit" element = { <Deposit/> }/>
              <Route exact path="/withdraw" element = { <Withdraw/> }/>
            </Routes>
            </section>
     </Router>
    </Provider>
  )};

export default App;
