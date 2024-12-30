import React from 'react';
import { Link } from 'react-router-dom';
import iconCart from '../assets/images/carro-de-la-compra.png';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cart';

const ProductCart = (props) => {
  const carts = useSelector((store) => store.cart.items);
  const { id, title, price, images } = props.data;
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({
        productId: id,
        quantity: 1
    }));
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
       <Link to={`/${id}`}>
       <img
          src={images[0]}
          alt={title}
          className="w-full h-100 object-cover object-top drop-shadow-[0_100px_30px_#0007]"
        />
       </Link>
        
   
      <h3 className="text-2xl py-3 text-center font-medium">{title}</h3>
      <div className="flex justify-between items-center">
        <p>
          $<span className="text-2xl font-medium">{price}</span>
        </p>
        <button className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2"
            onClick={handleAddToCart}>
          <img src={iconCart} alt="Carrito de compra" className="w-5" />
          Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
