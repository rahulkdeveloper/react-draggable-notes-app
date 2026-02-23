import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import AddExpense from './pages/AddExpense';
import AminationAlert from './components/AminationAlert';
import PrivateLayout from './routes/PrivateLayout';

function App() {


  return (
    <div>

      <Router>
        <AminationAlert />

        <Routes>
          <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute>}></Route>
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}></Route>

          <Route element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/add-expense" element={<AddExpense />} />
          </Route>
        </Routes>

      </Router>



    </div>
  )
}

export default App
