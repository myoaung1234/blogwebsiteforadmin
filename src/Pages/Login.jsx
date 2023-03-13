import '../components/Register.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

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

  if(isLoggedIn) {
    return <h2>Loading ....</h2>
  }

  return (
    <div className='login'>
      <div className="register-container">
        <h2><span>Login</span> Form</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" onChange={e => setEmail(e.target.value)}  required />
  
          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} required />

          <button type="submit" className="register-btn" disabled={isLoggedIn} >Login</button>
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
