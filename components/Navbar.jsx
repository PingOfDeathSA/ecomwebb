import React from 'react'
import Link from 'next/link'
import { BsBag } from 'react-icons/bs';
import {Card, Cart } from './';
import { useStateContext } from '../context/StateContext';




const Navbar = () => {
  const { showCart, setShowCart,totalQuantities } = useStateContext();
  return (
    <div>
      <div className="navbar-container">
        <p className="logo">
          <Link href="/">SYGE DEVS</Link>
        </p>

        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(!showCart)}
        >
          <BsBag />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>

        <div className="">{showCart && <Card />}</div>
      </div>
    </div>
   
   
    
  )
}

export default Navbar
