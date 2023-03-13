import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { FaBorderAll, FaImages, FaUserFriends } from 'react-icons/fa'
import { axiosAuth } from '../config/axios';

const Dashboard = () => {
  const [category, setCategory] = useState();
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();

  console.log(users)

  const getCategory = async () => {
    const url = "http://localhost:5000/v1/categories";
    const resultPost = await ( await axiosAuth.get(url)).data
    setCategory(resultPost);
  }

  const getUsers = async () => {
    const url = "http://localhost:5000/v1/users";
    const resultPost = await ( await axiosAuth.get(url)).data
    setUsers(resultPost);
  }
  
  const getPosts = async () => {
    const url = "http://localhost:5000/v1/posts";
    const resultPost = await ( await axiosAuth.get(url)).data
    setPosts(resultPost);
  }
  useEffect(() => {
    getCategory();
    getUsers();
    getPosts();
  }, []);

  

  return (
    <div className='dashboard'>
      <div className="posts-header">
        <div className="header-left">
          <h2>Dashboard</h2>
          <p><span>Welcome !</span></p>
        </div>
      </div>
      <div className="datas">
        <div className="total-posts">
          <div className="post">
            <h3>Total Posts -</h3>
            <div className="icon"><FaImages /></div>
          </div>
          <p>{posts?.totalResults}</p>
        </div>
        <div className="total-posts">
          
          <div className="post">
            <h3>Total Users -</h3>
            <div className="icon"><FaUserFriends /></div>
          </div>
          <p>{users?.totalResults}</p>
        </div>
        <div className="total-posts">
          <div className="post">
            <h3>Total Category -</h3>
            <div className="icon"><FaBorderAll/></div>
          </div>
          <p>{category?.totalResults}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
