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
    <div className="login-wrapper">
    <h1>Login</h1>
      <form className="login-form" action="POST">
        <div className="inputs">
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
        </div>
        <button type="submit" onClick={submit} >login</button>
        <div className="links">
          <Link to={"/"}>HOME</Link>
          <Link to="/signup">First time?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
