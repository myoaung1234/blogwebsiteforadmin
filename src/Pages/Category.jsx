import React, { useState,useEffect } from 'react'
import { BiChevronsRight, BiImageAdd } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { apiURL, axiosAuth } from '../config/axios'

const Category = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState();
  const [page, setPage] = useState(1);

  const getCategories = async () => {
    const url = `${apiURL}/categories?page=${page}&limit=8`;
    const resultCategories = await ( await axiosAuth.get(url)).data
    setCategory(resultCategories);
    setPage(resultCategories?.page)
  }

  const handleNext = () => {
    setPage(page + 1)
  }

  const handlePrev = () => {
    setPage(page - 1)
  }

  useEffect(() => {
    getCategories();
  }, [page]);

  
   //handle Delete Function
    const handleDelete = async (id) =>{
      alert("Are you sure to Delete")
      await  axiosAuth.delete( `${apiURL}/categories/${id}`)
      getCategories()
    }

  
  return (
    <div className='posts'>
      <div className="posts-header">
        <div className="header-left">
          <h2>Categories</h2>
          <p>Dashboard<BiChevronsRight /><span>Manage Categories</span></p>
        </div>
        <div className='add-new' onClick={() => {
          navigate('/admin/category/add-new-category')
        }}><i><BiImageAdd/></i>Add Category</div>
      </div>
      <div className="posts-list">
        <table>
          <thead>
          <tr className='table-header'>
            <th>ID</th>
            <th>Category Name</th>
            <th>Number of Posts</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {
            category?.results?.map((data, i) => (
              <tr key={i}>
                <td>{(data.id).slice(0, 8)}...</td>
                <td>{data.name}</td>
                <td>{data.numberOfPosts}</td>
                <td className='action'>
                  <p className='edit' onClick={() => navigate(`/admin/category/${data.id}`)}><FiEdit /></p>
                  <p className='delete' onClick={() => handleDelete (data.id)}><MdDelete /></p>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
        <div className="pagi">
          <button disabled={1 >= page} onClick={() => handlePrev()}>Prev</button>
          <button disabled={category?.totalPages <= page} onClick={() => handleNext()}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default Category