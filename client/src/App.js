import './App.css';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
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
          
            <Alert  />
            <Routes>
              <Route exact path="/" element = { <Landing/> }/>
              <Route exact path="/register" element = { <Register/> }/>
              <Route exact path="/login" element = { <Login/> }/>
            </Routes>
     </Router>
    </Provider>
  )};

export default App;
