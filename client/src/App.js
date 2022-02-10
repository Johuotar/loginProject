import './App.css';
//React Router v6 introduces a Routes component which replaces Switch
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Register from "./Register";

function App() {
  return (
      <BrowserRouter>

      <div>
        <Link to={'/home'}>Home</Link> |
        <Link to={'/login'}>Login</Link> |
        <Link to={'/register'}>Register</Link>
      </div>
      <Routes>
        <Route exact path={'/register'} element={<Register />} component={Register}>
        </Route>
      </Routes>
      <hr />
      
      </BrowserRouter>
  );
}

export default App;
