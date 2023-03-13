import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BiChevronsRight } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { axiosAuth } from '../config/axios';

const AddQuotes = () => {
  let navigate = useNavigate();
  const [quoteser, setQuoteser] = useState('');
  const [quotes, setQuotes] = useState('');

  
  
  const handleSubmite = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/v1/quotess'
    
    try {
      const res = await (await axiosAuth.post(url, {quoteser: quoteser, quotes: quotes})).data
      navigate('/admin/quotes')
    } catch (error) {
      console.log(error)
    } 
  }

  return (
    <div className='add-new'>
      <div className="posts-header">
        <div className="header-left">
          <h2>Add News</h2>
          <p>Dashboard<BiChevronsRight />Manage Quotes<BiChevronsRight /><span>Add Quotes</span></p>
        </div>
      </div>
      <div className='product-form-wrapper'>
        <form className='product-form quotes' onSubmit={(e) => handleSubmite(e)}>

            <div className='product-form-control'>
                <label className='username'>Quoteser*</label>
                <input type="text" onChange={e => setQuoteser(e.target.value)} required />
            </div>

            <div className='product-form-control'>
                <label className='username'>Quoteser*</label>
                <ReactQuill theme="snow" className='quill' onChange={setQuotes} />
            </div>


            <div className='product-btn-control'>
              <a href="/quotes">Back To</a>
              <button type='submit' className='new-product-btn'>Add Category</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default AddQuotes