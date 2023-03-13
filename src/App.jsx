import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Layouts/auth';
import Main from './Layouts/main';
import Login from './Pages/Login';
import Posts from './Pages/Posts';
import AddNew from './Pages/AddNew';
import Category from './Pages/Category';
import AddCateories from './Pages/AddCategory';
import Quotes from './Pages/Quotes';
import AddQuote from './Pages/AddQuotes'
import Error from './Pages/Error'
import User from './Pages/User'
import Dashboard from './Pages/Dashboard';
import Register from './components/Register';
import EditPost from './Pages/editPosts';
import EditCategory from './Pages/editCategory';

function App() {
  
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='auth' element={<Auth />} >
                    <Route path='login' element={<Login />}/>
                </Route>
                  <Route path='admin' element={<Main/>} >
                    <Route path='' element={<Dashboard />}/>
                    <Route path='dashboard' element={<Dashboard/>}/>
                    <Route path='posts' element={<Posts/>}/>
                    <Route path='posts/add-new-post' element={<AddNew />} />
                    <Route path='posts/:id' element={<EditPost />}/>
                    <Route path='user' element={<User/>}/>
                    <Route path='category' element={<Category />}/>
                    <Route path='category/add-new-category' element={<AddCateories />}/>
                    <Route path='category/:id' element={<EditCategory />}/>
                    <Route path='quotes' element={<Quotes />}/>
                    <Route path='quotes/add-new-quotes' element={<AddQuote />}/>
                    <Route path='user/register' element={<Register/>}/>
                    <Route path='*' element={<Error />}/>
                  </Route>
            </Routes>
        </BrowserRouter>
    </>

    
  )
}


export default App
