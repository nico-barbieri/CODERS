import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:5000/signup", {
          email,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            alert("user already exists");
          } else if (res.data === "notexist") {
            history("/home", { state: { id: email } });
            console.log("utente creato");
          }
        })
        .catch((err) => {
          alert("wrong details");
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signup-wrapper">
      <h1>Signup</h1>
      <form className="signup-form" action="POST" onSubmit={submit}>
        <div className="inputs">
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
        </div>
        <button type="submit" onClick={submit}>
          Signup
        </button>
        <div className="links">
          <Link to={"/"}>HOME</Link>
          <Link to="/login">Already registered?</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
