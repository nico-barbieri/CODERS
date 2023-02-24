import {useState} from 'react';
import { Link } from 'react-router-dom';

function Login(prop) {
    const [state, setState] = useState({
        name: '',
        password: '',
        remember: false,
    });

    const handleInput = (e) => {
        const {name, type, value, checked} = e.target;
        setState((state) =>{
            return {
                ...state,
                [name]: (type === 'checkbox') ? checked : value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('(placeholder)sto loggando...')
    }

    const handleReset = () => {
        setState((state) =>{
            return {
                ...state,
                name: '',
                password: '',
                remember: false,
            }
        })
        console.log(state);
    }
    
    return <>
    <form onSubmit={handleSubmit}>
        <input name='name' value={state.name} onChange={handleInput} />
        <input name='password' type='password' value={state.password} onChange={handleInput} />
        <input name='remember' type='checkbox' checked={state.remember} onChange={handleInput} />
        <button type='submit' disabled={!state.name || !state.password}>login</button>
        <button onClick={handleReset}>reset</button>
        <Link to={'/'}>HOME</Link>
        
    </form>
    </>
}

export default Login;