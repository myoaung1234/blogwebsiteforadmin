import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { FaBorderAll, FaImages, FaUserFriends } from 'react-icons/fa'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { axiosAuth } from '../config/axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [category, setCategory] = useState();
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();
  const [quotes, setQuotes] = useState();
  const navigate = useNavigate()

  const getCategory = async () => {
    const url = "http://localhost:5000/v1/categories";
    const resultPost = await ( await axiosAuth.get(url)).data
    setCategory(resultPost);
  }

  const getQuotes = async () => {
    const url = "http://localhost:5000/v1/quotess";
    const resultPost = await ( await axiosAuth.get(url)).data
    setQuotes(resultPost);
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
    getQuotes()
  }, []);

  const redirectFromDashboard = (url) => {
    navigate(url)
  }

  return (
    <div className='dashboard'>
      <div className="posts-header">
        <div className="header-left">
          <h2>Dashboard</h2>
          <p><span>Welcome !</span></p>
        </div>
      </div>
      <div className="datas">
        <div className="total-posts" onClick={() => redirectFromDashboard('/admin/posts')}>
          <div className="post">
            <h3>Posts</h3>
            <p className='-blue'>{posts?.totalResults}</p>
          </div>
          <div className="icon text-blue"><FaImages /></div>
          <div className="view-overlay">
            View<AiOutlineDoubleRight/>
          </div>
        </div>
        <div className="total-posts" onClick={() => redirectFromDashboard('/admin/user')}>
          <div className="post">
            <h3>Users</h3>
            <p className='-orange'>{users?.totalResults}</p>
          </div>
          <div className="icon text-orange"><FaUserFriends /></div>
          <div className="view-overlay">
            View<AiOutlineDoubleRight/>
          </div>
        </div>
        <div className="total-posts" onClick={() => redirectFromDashboard('/admin/category')}>
          <div className="post">
            <h3>Categories</h3>
            <p className='-green'>{category?.totalResults}</p>
          </div>
          <div className="icon text-green"><FaBorderAll/></div>
          <div className="view-overlay">
            View<AiOutlineDoubleRight/>
          </div>
        </div>
        <div className="total-posts" onClick={() => redirectFromDashboard('/admin/quotes')}>
          <div className="post">
            <h3>Quotes</h3>
            <p className='-red'>{quotes?.totalResults}</p>
          </div>
          <div className="icon text-red"><FaBorderAll/></div>
          <div className="view-overlay">
            View<AiOutlineDoubleRight/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
