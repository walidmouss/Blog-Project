import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Tester from './pages/Tester'
import ViewPosts from './pages/ViewPosts';
import CreatePost from './pages/CreatePost';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/Tester' element = {<Tester/>} />
        <Route path='/ViewPosts/:userID' element = {<ViewPosts/>} />
        <Route path='/CreatePost/:userID' element= {<CreatePost/>} />

      </Routes>
    </Router>
  );
};

export default App;
