import React, {useRef} from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { AiOutlineMinus, AiOutlinePlus,AiOutlineRight, AiFillDelete } from 'react-icons/ai';

import { toast, Toast } from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import  getStripe  from '../lib/getStripe';




const Card = () => {
  const  cartRef = useRef();
  const {totalPrice, totalQuantities, cartItems, setShowCart,onRemove, toggleCartItemQuanitity }= useStateContext();
 
  const handleCheckOut = async () => {
    const stripe = await getStripe();
  
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
  
    if (response.statusCode === 500) return;
  
    const data = await response.json();

    toast.loading('Redirecting...');
  
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  
  return (
    
    <div className='cart-wrapper' ref={cartRef}>
     <div className='cart-container'>
    <button type='button' className='cart-heading' 
    onClick={()=> setShowCart(false)}>

<span className='heading'> Your Cart</span>
<span className='cart-num-items'> ({totalQuantities}items)</span>
<AiOutlineRight/>
    </button>
    {cartItems?.length < 1 && (
  <div className='empty-cart'>
    <AiOutlineShopping size={150} />
    <h3 className='jelly-empty'>Your Shopping Bag is empty</h3>
    <Link href='/'> <button type='button'
    onClick={()=> setShowCart(false)}
    className="btn"
    >
      Continue Shopping
      
      </button></Link>
  </div>
)}
  <div className='product-container'>
  {cartItems?.length >= 1 &&
    cartItems
      .sort((a, b) => b.price - a.price) // Sort items in descending order based on price
      .map((item, index) => (
        <div className='product' key={item._id}>
          <img src={urlFor(item?.image[0])} className='cart-product-image' />
          <div className='item-desc'>
            <div className='flex top'>
              <h5>{item.name}</h5>
              <h5>R{item.price}.99</h5>
            </div>
            <div className='felx bottom'>
              <div>
                <p className='quantity-desc'>
                  <div className='quantity-controls'>
                    <span className='minus' onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
                      <AiOutlineMinus/>
                    </span>
                    <span className='quant'>{item.quantity}</span>
                    <span className='plus' onClick={() => toggleCartItemQuanitity(item._id, 'inc')}>
                      <AiOutlinePlus/>
                    </span>
                  </div>
                </p>
              </div>
              <button type='button' className='remove-item' onClick={()=>onRemove(item)}>
                <AiFillDelete />
              </button>
            </div>
          </div>
        </div>
      ))}
</div>

   {cartItems?.length >=1 && (
    <div className='cart-bottom'>
 <div className='total'>
  <h3> Subtotal: </h3>
  <h3> R{totalPrice}.99</h3>
  <div className='btn-container'> 
  <button type='button'
  className='btn'
  onClick={handleCheckOut}>
Pay with Stripe
    </button>
    </div>

</div>
    </div>
   )}
     </div>

    </div>
  )
}

export default Card
