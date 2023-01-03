import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login, Home } from './pages/index';
import { Auth } from '@three0dev/js-sdk'

function App() {
  return (
    <Router>
    <Routes>
        <Route path='/' element={Auth.isLoggedIn() ? <Navigate to='/home' /> : <Login /> } />
        <Route exact path='/home' element={Auth.isLoggedIn() ? <Home/> : <Navigate to='/' />}> 
        </Route>
    </Routes>
    </Router>
  );
}

export default App;
