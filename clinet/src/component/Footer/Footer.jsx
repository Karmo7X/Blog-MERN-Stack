import React from 'react'
import Logo from "../../img/logo.png"
import "./footer.css"
const Footer = () => {
  return (
    <div className='footer-page '>
      <div className="container">
       <footer className='footer mb-3'>
     <img src={Logo} alt="" />
      <span>
        Made with ♥️ and <b>React.js</b>.
      </span>
     </footer>
      </div>
    
    </div>
     
     )
}

export default Footer
