import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PostForm from '../components/PostForm/PostForm'
import PostList from '../components/PostList/PostList'
import UserAnalytics from '../components/UserAnalytics/UserAnalytics'
import UserList from '../components/UserList/UserList'
import Userform from '../components/UserForm/UserForm'
import PostAnalytics from '../components/PostAnalytics/PostAnalytics'
import ViewUser from '../components/ViewUser/ViewUser'

function AllRoutes() {
  return (
   <Routes>
    <Route path='/postform' element={<PostForm />}/>
    <Route path='/postlist' element={<PostList />}/>
    <Route path='/postanalytics' element={<PostAnalytics/>}/>
    <Route path='/userform' element={<Userform/>}/>
    <Route path='/userlist' element={<UserList/>}/>
    <Route path='/useranalytics' element={<UserAnalytics/>}/>
    <Route path='/viewuser' element={<ViewUser/>}/>


   </Routes>
  )
}

export default AllRoutes