import React from 'react'
import {AiFillLinkedin} from 'react-icons/ai'
import {AiOutlineGithub} from 'react-icons/ai'
const Footer = () => {
  return (
    <div className='footer-container'>
      <p> 2022@ SYGE website All rights reserverd</p>
      <p className='icons'> 
      <AiFillLinkedin  href = "https://www.linkedin.com/in/ronald-ntjana-91bb99214/" />
      
      <AiOutlineGithub href= "https://github.com/PingOfDeathSA"/>
      </p>
      
     
    </div>
  )
}

export default Footer
