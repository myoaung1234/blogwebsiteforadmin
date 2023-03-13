import React, { useEffect, useState } from 'react'
import './User.css'
import { HiUsers } from 'react-icons/hi'
import { BiChevronsRight } from 'react-icons/bi'
import { axiosAuth } from '../config/axios'
import { format } from 'timeago.js';

const User = () => {
  const [users, setUsers] = useState();
  const [page, setPage] = useState(1);

  const getUsers = async () => {
    const url = `http://localhost:5000/v1/users?page=${page}&limit=4`;
    const resultUsers = await ( await axiosAuth.get(url)).data
    setUsers(resultUsers);
    setPage(resultUsers?.page) 
  }

  const handleNext = () => {
    setPage(page + 1)
  }

  const handlePrev = () => {
    setPage(page - 1)
  }

  useEffect(() => {
    getUsers();
  }, [page]);

  return (
    <div className='user-container'>
      <div className="posts-header">
        <div className="header-left">
          <div className="user-header">
            <h2>User Info</h2>
            <i><HiUsers /></i>
          </div>
          <p>Dashboard<BiChevronsRight /><span>User Info</span></p>
        </div>
        <div className="add-new">
          <a href="/admin/user/register">Add User</a>
        </div>
      </div>
      <div className="user-list">
          <table>

            <thead>
              <tr className='table-header'>
                <th>ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Register Date</th>
                <th>Posts</th>
              </tr>
            </thead>
            <tbody>
              {
                users?.results?.map((data, i) => (
                  <tr key={i}>
                  <td>{(data.id).slice(0, 8)}...</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{format(data.createdAt)}</td>
                  <td>{14}</td>
                </tr>
                ))
              }
              
              </tbody>
          </table>
          <div className="pagi">
            <button disabled={1 >= page} onClick={() => handlePrev()}>Prev</button>
            <button disabled={users?.totalPages <= page} onClick={() => handleNext()}>Next</button>
          </div>
        </div>
    </div>
  )
}

export default User
