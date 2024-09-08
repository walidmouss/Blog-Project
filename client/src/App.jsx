import React from 'react'
import Login from './Login'
import Signup from './Signup'

import { BrowserRouter, Route , Routes , Link } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
        <Routes className ='App' >
          <Route path = "/" element = {<Login/> } />
          <Route path = "/signup" element = {<Signup /> } />
        </Routes>
    </BrowserRouter>
  )
}

export default App