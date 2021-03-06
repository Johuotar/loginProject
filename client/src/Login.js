import {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from "./UserContext"

function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loginError,setLoginError] = useState(false);

    const user = useContext(UserContext);

    function LoginUser(e) {
        e.preventDefault(); //Dont use default http request

        const data = {email,password};
        axios.post('http://localhost:4000/login', data, {withCredentials:true})
        .then(response => {
            user.setEmail(response.data.email);
            setEmail('');
            setPassword('');
            setLoginError(false);
        })
        .catch(() => {
            setLoginError(true);
        });
    }

    return (
        <form action="" onSubmit={e => LoginUser(e)}>
            {loginError && (
                <div>Wrong email or password!</div>
            )}
            <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} /> <br />
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} /> <br />
            <button type="submit">login</button>
        </form>
    )
}

export default Login;