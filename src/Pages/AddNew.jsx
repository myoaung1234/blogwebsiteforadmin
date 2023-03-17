import './AddNew.css'
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BiChevronsRight, BiImageAdd } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { apiURL, axiosAuth } from '../config/axios';
import axios  from 'axios';

const AddNew = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('')
  const [desc, setDesc] = useState('');
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true)
  
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

    const getCategory = async () => {
      const url = `${apiURL}/categories`;
      const resultPost = await ( await axiosAuth.get(url)).data
      setCategories(resultPost);
    }

    useEffect(() => {
      getCategory();
    }, []);

  let postURL = `${apiURL}/posts`
  const handleSubmite = async (e) => {
    const Credentials = { 
      title: title, 
      image: image,
      summary: summary, 
      desc: desc , 
      category: category 
    }
    e.preventDefault();
    try {
      setLoading(false)
      const res = await (await axiosAuth.post(postURL, Credentials)).data
      setLoading(true)
      navigate('/admin/posts')
    } catch (error) {
      console.log(error)
    }
  }

  if(!loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='add-new'>
      <div className="posts-header">
        <div className="header-left">
          <h2>Add News</h2>
          <p>Dashboard<BiChevronsRight />Manage News<BiChevronsRight /><span>Add News</span></p>
        </div>
      </div>
      <div className='product-form-wrapper'>
        <form className='product-form'  onSubmit={(e) => handleSubmite(e)}>
            <div className='product-form-control'>
                <label className='username'>Title*</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="product-form-control">
              <p>Image*</p>
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
                <label className='username'>Summary</label>
                <input type="text" onChange={e => setSummary(e.target.value)} required />
            </div>

            <div className='product-form-control'>
                <label className='username'>Categories</label>
                <select name="options" onChange={e => setCategory(e.target.value)} required>
                  <option value="">Choose an Option</option>
                  {
                   categories?.results?.map((data, i) => (
                    <option value={data.id} key={i}>{data.name}</option>
                   ))
                  }
                </select>
            </div>

            <div className='product-form-control'>
                <label className='username'>Description</label>
                <ReactQuill theme="snow" className='quill' onChange={(e) => setDesc(e)} required/>
            </div>

            <div className='product-btn-control'>
              <a href="/admin/posts">Back To</a>
              <button type='submit' 
                className='new-product-btn' 
                onSubmit={(e) => handleSubmite(e)} 
                disabled={!loading}
              >Add New Post</button>
            </div>
        
        </form>
      </div>
    </div>
  )
}

export default AddNew

