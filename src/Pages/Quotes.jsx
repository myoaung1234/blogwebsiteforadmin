import React, { useEffect, useState } from 'react'
import { BiChevronsRight, BiImageAdd } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { apiURL, axiosAuth } from '../config/axios'

const Setting = () => {
  const [quotes, setQuotes] = useState();
  const [page, setPage] = useState(1);

  
  const getQuotes = async () => {
    const url = `${apiURL}/quotess?page=${page}&limit=4`;
    const resultQuotes = await ( await axiosAuth.get(url)).data
    setPage(resultQuotes?.page)
    setQuotes(resultQuotes);
  }

  const handleNext = () => {
    setPage(page + 1)
  }

  const handlePrev = () => {
    setPage(page - 1)
  }

  useEffect(() => {
    getQuotes();
  }, [page]);

   //handle Delete Function 
    const handleDelete = async (id) =>{
      alert("Are you sure to Delete")
      await  axiosAuth.delete( `http://localhost:5000/v1/quotess/${id}`)
        getQuotes();
    }

  const navigate = useNavigate()

  return (
    <div className='posts'>
      <div className="posts-header">
        <div className="header-left">
          <h2>Quotes</h2>
          <p>Dashboard<BiChevronsRight /><span>Manage Quotes</span></p>
        </div>
        <div className='add-new' onClick={() => {
          navigate('/admin/quotes/add-new-quotes')
        }}><i><BiImageAdd/></i>Add Quotes</div>
      </div>
      <div className="posts-list">
        <table>
          <thead>
          <tr className='table-header'>
            <th>ID</th>
            <th>Quoteser*</th>
            <th>Quotes*</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {
            quotes?.results?.map((data, i) => (
              <tr key={i}>
                <td>{(data.id).slice(0, 8)}...</td>
                <td>{data.quoteser}</td>
                <td>{data.quotes}</td>
                <td className='action'>
                  <p className='edit'><FiEdit /></p>
                  <p className='delete' onClick={() => handleDelete(data.id)}><MdDelete /></p>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
        <div className="pagi">
          <button disabled={1 >= page} onClick={() => handlePrev()}>Prev</button>
          <button disabled={quotes?.totalPages <= page} onClick={() => handleNext()}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default Setting