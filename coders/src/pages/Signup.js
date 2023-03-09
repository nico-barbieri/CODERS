import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {

    const history = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async(e)=> {
        e.preventDefault();

        try {
            
            await axios.post("http://localhost:5000/signup", {
                email,password
            })
            .then(res => {
                if(res.data === 'exist'){
                    alert('user already exists')
                }
                else if(res.data ==='notexist'){
                    history('/home',{state:{id:email}});
                    console.log('utente creato')
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
    <h1>Signup</h1>
      <form action="POST" onSubmit={submit}>
      <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          name=""
          id=""
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input type="submit" onClick={submit} placeholder="invia" / >
        <br />
        <Link to={"/"}>HOME</Link>
        <p>or</p>
        <Link to="/">Login Page</Link>
      </form>
      <p></p>
    </>
  );
}

export default Signup;
