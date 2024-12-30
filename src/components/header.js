import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import iconCart from '../assets/images/carro-de-la-compra.png'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { toggleStatusTab } from '../store/cart';

const Header = () => {
  const [totalQuatity, setTotalQuantity] = useState(0);
  const dispatch = useDispatch();
const carts = useSelector((store) => store.cart.items);
  useEffect(() =>{
    let total = 0;
    carts.forEach(item => total += item.quantity);
    setTotalQuantity(total);
      
  },[carts]);
  const handleOpenCartTab= () =>{
    dispatch(toggleStatusTab())
  }
  return (
    <header className='flex justify-between items-center mb-5'>
      <Link to="/" className='text-xl front-semiblod'>Home.</Link>
      <div className='w-10 h-10 bg-gray-100 rounded-full flex justify-center item-center relative' onClick={handleOpenCartTab}>
        <img src={iconCart} alt="" className='w-6'/>
        <span className='absolute top-2/3 right-1/2 bg-red-500 text-white
         text-sm w-5 h-5 rounded-full flex justify-center items-center'>{totalQuatity}</span>
      </div>
    </header>
  )
}

export default Header