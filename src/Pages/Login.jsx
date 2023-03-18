import '../components/Register.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import loading from '../assets/1488.gif'


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    console.log(isLoading);

    const handleLogin = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/admin");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <div className='login'>
      <div className="register-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email"><p>Email</p></label>
          <input type="text" placeholder="Enter Email" onChange={e => setEmail(e.target.value)}  required />
  
          <label htmlFor="psw"><p>Password</p></label>
          <input type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} required />

          <button type="submit" className="register-btn" disabled={isLoading} >
            {
              isLoading ?
              <span>Loading ...</span>
              :
              <span>Login</span>
            }
          </button>
        </form>
        {message && (
          <div className="form-group">
            <div style={{color: 'red', marginTop: '10px'}}>
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
