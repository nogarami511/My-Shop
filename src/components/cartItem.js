import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeQuantity } from '../store/cart';

const CartItem = (props) => {
  const { productId, quantity } = props.data;
  const [detail, setDetail] = useState(null); // Cambiado a null para trabajar mejor con un único objeto
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleMinusQuantity = () =>{
    dispatch(changeQuantity({
        productId: productId,
        quantity: quantity - 1
    }));
  }
  const handlePlusQuantity = () =>{
    dispatch(changeQuantity({
        productId: productId,
        quantity: quantity + 1
    }));
  }
  console.log(error);

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

  useEffect(() => {
    if (products.length > 0) {
      const findDetail = products.find((product) => product.id === productId);
      console.log(findDetail);
      setDetail(findDetail || null); // Evitar problemas si no se encuentra el producto
    }
  }, [productId, products]); // Escucha cambios en ambos

  return (
    <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md">
      {detail ? (
        <>
          <img src={detail.images[0]} alt='' className='w-12'/>
          <h3>{detail.name}</h3>
          <p>$ {detail.price * quantity}</p>
          <div>
            <button className='bg-gray-200 rounded-full 2-6 h-6 text-cyan-600' onClick={handleMinusQuantity}>-</button>
            <span>{quantity} </span>
            <button className='bg-gray-200 rounded-full 2-6 h-6 text-cyan-600' onClick={handlePlusQuantity}>+</button>
            
          </div>
        </>
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
    </div>
  );
};

export default CartItem;
