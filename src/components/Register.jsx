import React, { useState } from 'react'
import './Register.css'
import './Register.css'
import { apiURL, axiosAuth } from '../config/axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiChevronsRight, BiImageAdd } from 'react-icons/bi';

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [name , setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onUpload = (files) => {
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'zzpdfloq');
    axios.post(
      'https://api.cloudinary.com/v1_1/dttk6eaz9/image/upload', 
      formData)
      .then((response) => {
        setImage(response.data.secure_url)
      })
  }

  const handleSubmite = async (e) => {
    const data = { image, name, email, password};
    const url = `${apiURL}/users`;
    e.preventDefault();
    try {
      const res = await (await axiosAuth.post(url, data)).data
      navigate('/admin/user');
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <div className="register-container">
        <div className="posts-header">
          <div className="header-left">
            <h2>Add User</h2>
            <p>Dashboard<BiChevronsRight />Manage User<BiChevronsRight /><span>Add User</span></p>
          </div>
        </div>
        <div className='product-form-wrapper'>
        <form className='product-form'  onSubmit={e => handleSubmite(e)}>
            <div className='product-form-control'>
                <label className='username'>User Name*</label>
                <input type="text" onChange={e => setName(e.target.value)} required />
            </div>
            <div className="product-form-control">

                <label htmlFor="file-upload" className='custom-file-upload'>
                  {image ? <img src={image} alt="Image" />: <h1><BiImageAdd /></h1>}
                </label>
                <input 
                  type="file"
                  lable="Image"
                  name="myFile"
                  id='file-upload'
                  accept='.jpeg, .png, .jpg'
                  onChange={(e) => onUpload(e.target.files)}
                />
            </div>

            <div className='product-form-control'>
                <label className='username'>Email*</label>
                <input type="email" onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className='product-form-control'>
                <label className='username'>Password*</label>
                <input type="password" onChange={e => setPassword(e.target.value)} required />
            </div>

            <div className='product-btn-control'>
              <a href="/admin/user">Back To</a>
              <button type='submit' 
                className='new-product-btn' 
                onSubmit={(e) => handleSubmite(e)} 
              >Add User</button>
            </div>
        </form>
      </div>
      </div>
    </>
  )
}

export default Register

