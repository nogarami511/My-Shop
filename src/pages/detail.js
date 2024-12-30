import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeQuantity } from '../store/cart';
import iconCart from '../assets/images/carro-de-la-compra.png';
import { useParams } from 'react-router-dom';
import { addToCart } from '../store/cart';

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Fetch para obtener todos los productos
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

  // Encontrar el producto por id
  useEffect(() => {
    if (products.length > 0) {
      const findDetail = products.find(
        (product) => product.id === parseInt(id) // Convertir `id` a número
      );
      setDetail(findDetail || null); // Evitar problemas si no se encuentra el producto
    }
  }, [id, products]);

  // Si ocurre un error durante el fetch, mostrar un mensaje
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Mostrar mensaje de carga mientras no hay detalle
  if (!detail) {
    return <p>Cargando detalles del producto...</p>;
  }
  const handleAddToCart = () => {
      dispatch(addToCart({
          productId: parseInt(id),
          quantity: 1
      }));
    }

  // Renderizado del detalle del producto
  return (
    <div>
      <h2 className="text-3xl text-center">Detalle del producto</h2>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <img src={detail.images[0]} className="w-full" alt={detail.title} />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl uppercase font-bold">{detail.title}</h1>
          <p className='text3xl'>{detail.description}</p>
          <p className="font-bold text-3xl">${detail.price}</p>
        </div>
         <button className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2"
                    onClick={handleAddToCart}>
                  <img src={iconCart} alt="Carrito de compra" className="w-5" />
                  Agregar
                </button>
      </div>
    </div>
  );
};

export default Detail;
