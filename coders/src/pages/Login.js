import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {

    const history = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async(e)=> {
        e.preventDefault();

        try {
            
            await axios.post("http://localhost:5000/", {
                email,password
            })
            .then(res => {
                if(res.data === "exist"){
                    history('/home',{state:{id:email}})
                }
                else if(res.data ==='notexist'){
                    alert('User have not sign up')
                }
            })
            .catch(err => {
                alert('wrong details');
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }







  return (
    <>
    <h1>Login</h1>
      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          name=""
          id=""
        />
        <button type="submit" onClick={submit} >invia</button>
        <br />
        <Link to={"/"}>HOME</Link>
        <p>or</p>
        <Link to="/signup">Signup Page</Link>
      </form>
      <p></p>
    </>
  );
}

export default Login;
