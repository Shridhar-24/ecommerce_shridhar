import React, { useState,useContext } from 'react'
import { client, urlFOr } from '../../lib/client';
import {Product} from '../../components'
import {AiOutlineMinus,AiOutlinePlus,AiOutlineStar,AiFillStar} from 'react-icons/ai'
import  Context  from '../../context/StateContext';


const ProductDetails = ({product,products}) => {
  const{image,name,details,price} = product;
  const[index,setIndex] = useState(0);
  const{qty,incQty,decQty,onAdd,setShowCart} = useContext(Context);

  const handleBuyNow =()=>{
    onAdd(product,qty)
    setShowCart(true)
  }
  
  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={urlFOr(image && image[index])}
            className='product-detail-image'/>
          </div>
          <div className='small-images-container'>
            {
              image?.map((image,i)=>(
                <img key={i}
                src={urlFOr(image)}
                className ={i===index ? 'small-image selected-image':'small-image'}
                onMouseEnter={()=> setIndex(i)}
                />
              ))
            }
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(153)</p> 
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span
              className='minus'
              onClick={decQty}><AiOutlineMinus /></span>
              <span 
              className='num'>
                {qty}
              </span>
              <span
              className='plus'
              onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className='buttons'>
            <button className='add-to-cart'
                    onClick={()=>onAdd(product,qty)}>
              Add To Cart
            </button>
            <button className='buy-now'
                    onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
          <h2>You may also like</h2>
          <div className='marquee'>
            
            <div className='maylike-products-container track'>
            {
              products.map((item)=>(<Product key={item._id} product={item}/>))
            }
          </div>
            
          </div>
          
      </div>
  
    </div>
  )
}

export const getStaticPaths = async () =>{
  const querry =`*[__type == "product"]{
    slug{
      current
    }
  }`;

  const products = await client.fetch(querry);

  const paths = products.map((product) =>({
    params:{
      slug: product.slug.current
    }
  }));
  return{
    paths,
    fallback: 'blocking'
  }

}

export const getStaticProps =async ({params: {slug}})=>{
  const productQuerry = `*[_type=="product" 
  && slug.current == '${slug}'][0]`;
  const product = await client.fetch(productQuerry);

  const productsQuerry = '*[_type=="product"]';
  const products = await client.fetch(productsQuerry);

  return {
    props: {product,products}
  }
}
export default ProductDetails;