import {  useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar';
import { Route, BrowserRouter  as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import AddExpense from './pages/AddExpense';
import AminationAlert from './components/AminationAlert';

function App() {
  

  return (
    <div>

      <Router>
        <AminationAlert/>
        <Navbar />
        <div className='container'>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}></Route>
          <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute>}></Route>
          <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}></Route>
          <Route path='/add-expense' element={<PrivateRoute><AddExpense/></PrivateRoute>}/>
        </Routes>
        </div>
      </Router>



    </div>
  )
}

export default App
