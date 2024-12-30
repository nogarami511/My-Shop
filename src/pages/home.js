import React, { useState, useEffect } from 'react';
import ProductCart from '../components/productCart'

const Home = () => {

   const [products, setProducts] = useState([]); 
    const [error, setError] = useState(null);    
  
    useEffect(() => {
      fetch('https://api.escuelajs.co/api/v1/products') 
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la solicitud'); 
          }
          return response.json(); 
        })
        .then((data) => setProducts(data)) 
        .catch((error) => setError(error.message)); 
    }, []); 
    console.log(error);
  return (
    <div>
      <h1 className='text-3xl my-5'>Lista de Productos</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
      {products.map((product) =>
        
        <ProductCart key={product.id} data={product}/>
     
      )}
      </div>
      
    </div>
  )
}

export default Home