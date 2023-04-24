import React, { useState } from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./write.css"
import axios from 'axios'

import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
const Write = () => {
  const state =useLocation().state

  const  [ value, setValue]=useState(state?.title || '')
  const  [ title, setTitle]=useState(state?.description || '')
  const  [ file, setFile]=useState(null)
  const  [ cat, setCat]=useState(state?.cat || '')
 

  
     
  const upload = async()=>
  {
    try
    {
       const formdata =new FormData()
       formdata.append("file", file)
       const res =await axios.post(`http://localhost:5000/api/upload` ,formdata)
      return(res.data)
    }  
    catch(err)
    {
     console.log(err)
    }
  }

  const navigate = useNavigate()
  
     const handleCLick = async (e)=>
     {
      e.preventDefault();
      const imgurl =  upload()


      try{
        state
        ? await axios.put(`http://localhost:5000/api/posts/${state.id}`, {
            title,
            description: value,
            cat,
            img: file ? imgurl : "",
          })
        : await axios.post(`http://localhost:5000/api/posts/`, {
            title,
            description: value,
            cat,
            img: file ? imgurl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
      }
      catch(err)
      {
        console.log(err)
      }
     }

  return (
    <div className='container'>
      <div className="write-page">
        <div className="row ">
          <div className="col-sm-4 col-md-12 mb-5">
            <div className="content">
          <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)} />
          <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
          </div>
        </div>
          </div>
          <div className='col-sm-8 col-md-12  '>
          <div className="menu">
          <div className="item">
            <h1 >Publish</h1>
            <span>
              <b>Status:</b> Draft
            </span>
            <span>
              <b>Visibility : </b> Public
            </span>
            <input style={{display :"none"}} type="file" id="file"  name="file" onChange={e => setFile(e.target.files[0])} />
            <label className='file' htmlFor="file">Uplod Image</label>
            <div className="buttons">
              <button className='save'>save as a draft</button>
               <button className='publish' onClick={handleCLick}>Pubish</button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="cat">
              <input type="radio" checked={cat ==="art"} name="cat" value="art" id="art"  onChange={e => setCat(e.target.value)}/>
            <label htmlFor="art">Art</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat ==="science"} name="cat" value="science" id="science"  onChange={e => setCat(e.target.value)}/>
            <label htmlFor="science">Science</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat ==="technology"} name="cat" value="technology" id="technology"  onChange={e => setCat(e.target.value)}/>
            <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat ==="cinema"} name="cat" value="cinema" id="cinema" onChange={e => setCat(e.target.value)} />
            <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat ==="design"} name="cat" value="design" id="design" onChange={e => setCat(e.target.value)} />
            <label htmlFor="design">Design</label>
            </div>
            <div className="cat">
              <input type="radio" checked={cat ==="food"} name="cat" value="food" id="food" onChange={e => setCat(e.target.value)} />
            <label htmlFor="food">Food</label>
            </div>
            
          </div>
        </div>
          </div>
        </div>
        
      
      </div>
    </div>
  )
}

export default Write
