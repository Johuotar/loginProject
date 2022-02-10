import './App.css';
//React Router v6 introduces a Routes component which replaces Switch
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import UserContext from './UserContext';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Register from "./Register";
import Login from "./Login";


function App() {
  const [email,setEmail] = useState('');

  // When app starts, check if has logged in cookie

  useEffect(() => {
    axios.get('http://localhost:4000/user', {withCredentials:true})
      .then(response => {
        setEmail(response.data.email);
      });
  }, []);

  function logout() {
    axios.post('http://localhost:4000/logout', {}, {withCredentials:true})
      .then(() => setEmail(''));
  }

  return (
    <UserContext.Provider value={{email,setEmail}}>
      <BrowserRouter>
        <div>
          {!!email && (
            <div>Logged in as: {email}
              <button onClick={() => logout()}>Log out</button>
            </div>
          )}
          {!email && (
            <div>Not logged in</div>
          )}
        </div>
        <div>
          <Link to={'/home'}>Home</Link> |
          <Link to={'/login'}>Login</Link> |
          <Link to={'/register'}>Register</Link>
        </div>
        <hr />
        {!!email && (
          <div>Greetings, {email}, here are your files: Lorem ipsum dolor sit amet</div>
        )}
        {!email && (
          <Routes>
            <Route exact path={'/register'} element={<Register />} component={Register}></Route>
            <Route exact path={'/login'} element={<Login />} component={Login}></Route>
          </Routes>
        )}
        <hr />
      
      </BrowserRouter>
    </UserContext.Provider>
  );
}


export default App;
