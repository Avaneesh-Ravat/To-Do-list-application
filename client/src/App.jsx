import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./register.jsx";
import Login from "./login.jsx";
import Home from "./home.jsx";
import Form from './add.jsx';
import Edit from './edit.jsx'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/home/:id' element={<Home />}></Route>
        <Route path='/todo/:id' element={<Form />}></Route>
        <Route path='/edit/:id/:taskId' element={<Edit />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
