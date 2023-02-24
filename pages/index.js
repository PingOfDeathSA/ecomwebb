
import React from 'react';

 import {client} from '../lib/client';
import { Product, Footer,FooterBanner,Card,Layout,Navbar,HeroBanner } from '../components';

const Home = ({productData,bannerData}) => (
  
    <div>
      <HeroBanner HeroBanner ={bannerData.length && bannerData[0]} />
      {console.log(bannerData)};
      <div className='products-heading'> 
        <h2>Best Selling Shoes</h2>
        <p>Variations of Shoes</p>
      </div>
   <div className="products-container">
      {productData?.map((product) => <Product key={product._id} product={product} />)}
    </div>

     <FooterBanner FooterBanner={bannerData && bannerData[0]} />
    </div> 
  );
export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]'
  const productData = await client.fetch(productQuery);
  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: {productData,bannerData}
  }
}
export default Home;
// npm run dev
