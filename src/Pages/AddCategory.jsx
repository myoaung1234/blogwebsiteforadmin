import React, { useState, useEffect } from 'react'
import { BiChevronsRight } from 'react-icons/bi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { apiURL, axiosAuth } from '../config/axios';


const AddCateories = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('');

  let url = `${apiURL}/admin/categories`
  const handleSubmite = async (e) => {
    e.preventDefault();
    try {
      const res = await (await axiosAuth.post(url, {name: title})).data
      navigate('/admin/category')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='add-new'>
      <div className="posts-header">
        <div className="header-left">
          <h2>Add News</h2>
          <p>Dashboard<BiChevronsRight />Manage Categories<BiChevronsRight /><span>Add Categories</span></p>
        </div>
      </div>
      <div className='product-form-wrapper'>
        <form className='product-form' onSubmit={(e) => handleSubmite(e)}>

            <div className='product-form-control'>
                <label className='username'>Category Name*</label>
                <input type="text" name='title' value={title}
                // style={{textTransform: 'uppercase'}}
                  onChange={(e) => setTitle(e.target.value)} 
                />
                
            </div>

            <div className='product-btn-control'>
              <a href="/admin/category">Back To</a>
              <button type='submit' className='new-product-btn'>Add Category</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default AddCateories