import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./single.css"
import Edit from "../../img/edit.png"
import Delete from "../../img/delete.png"
import Menu from '../../component/Menu/Menu'
import moment from 'moment/moment'
import { AuthContext } from '../../component/context/authContext'
import axios from 'axios'

const Single = () => {

  const [post,setPosts] =useState({})

  const location =useLocation()

  const postId = location.pathname.split("/")[2]

  const {currentUser}= useContext(AuthContext)

  useEffect(()=>
  {
    const fetchData =async ()=>
    {
      try{
         const res =await axios.get(`http://localhost:5000/api/posts/${postId}`)
         setPosts(res.data)
      }
      catch(err)
      {
         console.log(err)
      }
    }
    fetchData()
  },[postId])

 
  const navigate = useNavigate();

  const handleDelete = async ()=>{
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const getText =(html) =>
  {
    const doc =new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }
 
  return (
    <div className='single-page'>
      <div className="container">
         <div className="single  ">
          <div className="content">
            <img src={`${post?.img}`} alt="" />
            <div className="user ">
            {post.userImg && <img
            src={post.userImg}
            alt=""
          />}
               <div className="info">
              <span className='fw-bold'>{post.username}</span>
              <p className='fw-bold'>Posted {moment(post.date).fromNow()}</p>
            </div>

              
              <div className="edit">
              <Link to={`/write?edit=2`} state={post} >
                <img src={Edit} alt="" />
              </Link>
              
              <img onClick={handleDelete}  src={Delete} alt="" />
            </div>
            
            </div>
           
           

           <h1 className='fs-1 '>{post.title} </h1>
              <p>
                {getText(post.description)}

                </p>
            
            
            
          </div>
          <Menu cat={post.cat}/>
         </div>
      </div>

      
    </div>
  )
}

export default Single
