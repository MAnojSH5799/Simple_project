import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import Navigation from './components/Navigation';
 import Login from './components/Login';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      {/* <Navigation /> */}
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/registration" element={<RegistrationForm />} />
           <Route path="/login" element={<Login />} />
          <Route path="/allUser" element={<UserList />} /> 
        </Routes>
    </Router>
  );
}

export default App;
