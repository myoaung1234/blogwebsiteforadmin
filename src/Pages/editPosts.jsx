
import './AddNew.css'
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BiChevronsRight } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { axiosAuth, axiosAuthUpload } from '../config/axios';
import axios from 'axios';

const EditPost = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState('');
  const [ post, setPost] = useState({
    title: '', 
    summary: '', 
    desc: '', 
    category: '', 
    image: ''});
    

  const onUpload = (files) => {
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'zzpdfloq');
    axios.post(
      'https://api.cloudinary.com/v1_1/dttk6eaz9/image/upload', 
      formData)
      .then((response) => {
        setPost({...post, image: response.data.secure_url})
      })
  }

    const getCategory = async () => {
      const url = "http://localhost:5000/v1/categories";
      const resultPost = await ( await axiosAuth.get(url)).data
      setCategories(resultPost);
    }

    const getPost = async (id) => {
      const url = `http://localhost:5000/v1/posts/${id}`;
      const getData = await ( await axiosAuth.get(url)).data;
      setPost({
        title: getData.title, 
        image: getData.image, 
        desc: getData.desc, 
        category: getData.category, 
        summary: getData.summary
      });
    }

    const { id } = useParams();
    const handleSubmite = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5000/v1/posts/${id}`
      const res = await (await axiosAuthUpload.patch(url, post, {})).data;
      navigate('/admin/posts');
     } catch (error) {
      console.log(error)
     }
  }

    useEffect(() => {
      getPost(id);
      getCategory();
    }, []);

  return (
    <div className='add-new'>
      <div className="posts-header">
        <div className="header-left">
          <h2>Update Post</h2>
          <p>Dashboard<BiChevronsRight />Manage News<BiChevronsRight /><span>Update Post</span></p>
        </div>
      </div>
      <div className='product-form-wrapper'>
        
        <form className='product-form'  onSubmit={(e) => handleSubmite(e)}>

            <div className='product-form-control'>
                <label className='username'>Title*</label>
                <input type="text" value={post?.title} onChange={(e) => setPost({...post, title: e.target.value})} required />
            </div>

            <div className="product-form-control">
              <p>Image*</p>
                <label htmlFor="file-upload" className='custom-file-upload'>
                  <img src={ post?.image} alt="Image" />
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
                <input type="text" value={post?.summary} onChange={(e) => setPost({...post, summary: e.target.value})} required />

            </div>

            <div className='product-form-control'>
                <label className='username'>Categories</label>
                <select name="options" value={post?.category.id} onChange={(e) => setPost({...post, category: e.target.value})} required>
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
                <ReactQuill theme="snow" className='quill' value={post?.desc} onChange={(e) => setPost({...post, desc: e})} required/>
            </div>

            <div className='product-btn-control'>
              <a href="/admin/posts">Back To</a>
              <button type='submit' className='new-product-btn' onSubmit={(e) => onSave(e)}>Update Post</button>
            </div>
        </form>
        
    </div>
    </div>
  )
}

export default EditPost