
import './AddNew.css'
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { BiChevronsRight } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { apiURL, axiosAuth, axiosAuthUpload } from '../config/axios';

const EditCategory = () => {
  const navigate = useNavigate();
  const [ category, setCategory] = useState(null);

    const getCategory = async (id) => {
      const url = `${apiURL}/categories/${id}`;
      const getData = await ( await axiosAuth.get(url)).data;
      setCategory({name: getData.name});
    }

    const { id } = useParams();
    const url = `${apiURL}/categories/${id}`
    const handleSubmite = async (e) => {
    e.preventDefault();
      const res = await axiosAuthUpload.patch(url, category, {});
      navigate('/admin/category');
  }

    useEffect(() => {
      getCategory(id);
    }, []);

  return (
    <div className='add-new'>
      <div className="posts-header">
        <div className="header-left">
          <h2>Update Category</h2>
          <p>Dashboard<BiChevronsRight />Manage News<BiChevronsRight /><span>Update Category</span></p>
        </div>
      </div>
      <div className='product-form-wrapper'>
        <form className='product-form'  onSubmit={(e) => handleSubmite(e)}>

            <div className='product-form-control'>
                <label className='username'>Category Name*</label>
                <input type="text" value={category?.name} onChange={(e) => setCategory({...category, name: e.target.value})} required />
            </div>

            <div className='product-btn-control'>
              <a href="/admin/posts">Back To</a>
              <button type='submit' className='new-product-btn' onSubmit={(e) => onSave(e)}>Update Category</button>
            </div>
        
        </form>
    </div>
    </div>
  )
}

export default EditCategory