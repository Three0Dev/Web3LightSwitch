import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login, Home } from './pages/index';
import {isLoggedIn} from 'three0-js-sdk/auth'

function App() {
  return (
    <Router>
    <Routes>
        <Route path='/' element={isLoggedIn() ? <Navigate to='/home' /> : <Login /> } />
        <Route exact path='/home' element={isLoggedIn() ? <Home/> : <Navigate to='/login' />}> 
        </Route>
    </Routes>
    </Router>
  );
}

export default App;
