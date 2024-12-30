import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './cartItem';
import { toggleStatusTab } from '../store/cart';

const CartTab = () => {
  const carts = useSelector(store => store.cart.items);
  const statusTab = useSelector(store => store.cart.statusTab);
  const dispatch = useDispatch();
  const handleCloseCartTab = () =>{
    dispatch(toggleStatusTab());
  }
  return (
    <div className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] transform ${
      statusTab === false ? 'translate-x-full' : ''
    }`}>
        <h2 className='p-5 text-white text-2xl'> Carrito de compras</h2>
        <div className='p-5'>
          {carts.map((item, key) => 
          <CartItem key={key} data={item}/>
          )}


        </div>
        <div className='grid grid-cols-2'>
          <button className='bg-black text-white' onClick={handleCloseCartTab}>Cerrar</button>
          <button className='bg-amber-600 text-white'>Finalizar</button>
        </div>
    </div>
  )
}

export default CartTab