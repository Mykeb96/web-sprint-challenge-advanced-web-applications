import React, { useState } from "react";
import { useHistory } from "react-router";
import axiosWithAuth from "../helpers/axiosWithAuth";
import axios from 'axios'

const Login = () => {

  const intialFormState = {
    username: '',
    password: ''
  }

  const history = useHistory();

  const [formData, setFormData] = useState(intialFormState)
  const [error, setError] = useState('')

  const handleChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const signIn = (e) => {
    e.preventDefault()
    console.log('signing in')
    axios.post(`http://localhost:5000/api/login`, formData)
      .then(res => {
        console.log(res)
        localStorage.setItem("authtoken", res.data.payload);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("password", res.data.password);
        history.push('/bubbles');
      })
      .catch(err => {
        setError('Incorrect User or Password!')
      })
    setFormData({
      username: '',
      password: ''
    })
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form>
          <label htmlFor="username">
            <input type="text" placeholder='Enter Username' value={formData.username} onChange={handleChanges} name='username' id='username' />
          </label>
          <label htmlFor="password">
            <input type="password" placeholder='Enter Password' value={formData.password} onChange={handleChanges} name='password' id='password' />
          </label>
          <button onClick={signIn} id='submit'> Sign in</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;