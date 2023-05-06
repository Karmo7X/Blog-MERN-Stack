import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"
import Logo from "../../img/logo.png"
import { AuthContext } from '../context/authContext'

const Navbar = () => {
  const {currentUser ,logout}=useContext(AuthContext)




  return (
    <div className="navbar mt-3">
        <nav class="navbar navbar-expand-lg bg-white position-relative w-100">
    <div class="container">
      <Link class="navbar-brand" to="/">
        <img src={Logo} alt=""  />
      </Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <Link className="nav-link active" aria-current="page"  to="/?cat=art">
                ART
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link"  to="/?cat=science">
            SCIENCE
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/?cat=cinema">
            CINEMA
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/?cat=design">
            DESIGN
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link"  to="/?cat=food">
                FOOD
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link "  to="/?cat=technology">
            TECHNOLOGY
            </Link>
          </li>
          <li class="nav-item">
             <span>{currentUser?.username }</span>
          </li>
          <li class="nav-item">
             <Link className="nav-link "  to="/login">logout</Link>
          </li>
         
          <li class="nav-item">
            <Link className="nav-link write" to="/write">
            Write
            </Link>
          </li>
        
          
        </ul>
        
      </div>
    </div>
  </nav>
    </div>
  
  )
}

export default Navbar
