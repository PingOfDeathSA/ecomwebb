import React, {useState} from 'react'
import { client, urlFor } from '../../lib/client';
import { useStateContext } from '../../context/StateContext';

import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import{Product} from '../../components'
const ProductDetails = ({ product, productData }) => {
  const { image, name, details, price } = product;
const [index, setIndex] =useState(0);
const { decQty, incQty, qty, onAdd,setShowCart} = useStateContext();

const handleBuyNow = () =>{
onAdd(product,qty);
setShowCart(true)
};
  return (
    <>
    
    <div className="row">
    <div  className='small-images-container'>
          {image?.map((item, i) => (
      <img
    
        src={urlFor(item)} 
        className={i === index ? 'small-image selected-image' : 'small-image'}
        onMouseEnter={() => setIndex(i)}
            />
        ))}
      </div>
    <div className='image-container '>
  <div key={index} className='disabled-image'>
    <img src={urlFor(image && image[index])}  alt={name} className='product-image1' />

  </div>
      
          <div className='product-details '>
            <div > 
              <div className='product-detail-desc '>
              <h1>{name}</h1>
              <div className='reviews'>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <p>(20)</p>
              </div>
              
            </div>
            <h4> Details:</h4>
              <p>{details}</p>
              <p className='price'>R{price}.99</p>
              <div className="quantity">
            <h3>Quantity:</h3>
            <div className="quantity-controls">
      <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
      <span className="quant" >{qty}</span>
      <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
    </div>
    <div className='buttons'>
    <button
  type='button'
  className='add-to-cart'
  onClick={() => onAdd(product, qty)}
>
  Add to Cart
</button>
<button type='button'
className='buy-now'
onClick={handleBuyNow}
> Buy Now</button>


     </div> 
            </div>
    
            <div className='product-details-price'>
        






<div></div>
     <div className='maylike-products-wrappper'>
      <h2> You may also like</h2>
      
      <div className='marquee'>
      <div className='maylike-product-container track'>
{productData.map((item)=>(<Product key={item._id} product={item}/>))}
</div>
      </div>
      </div>
       
          </div>
 
            </div>
            
          </div>
    
      
      </div>




       
   
    

    </div>




    
    
    
   </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug
  }`;
  const products = await client.fetch(query);
  const paths = products.map(product => ({
    params: {
      slug: product.slug.current
    }
  }));

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const productQuery2 = '*[_type == "product"]';
  const product = await client.fetch(productQuery);
  const productData = await client.fetch(productQuery2);

  return {
    props: { productData, product }
  }
}

export default ProductDetails
