import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    // Fetch product by ID
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [productId]);

  if (!product) return <p className="text-center mt-8">Loading product details...</p>;

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-6">{product.title}</h2>
        
        {/* Product Image */}
        <div className="flex justify-center mb-6">
          <img src={product.thumbnail} alt={product.title} className="w-64 h-64 object-cover rounded-md shadow-lg" />
        </div>

        {/* Product Info */}
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-800 mb-2">Price: ${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
        </div>
        
        {/* Additional Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <p><span className="font-bold">Category:</span> {product.category}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p><span className="font-bold">Rating:</span> {product.rating} / 5</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p><span className="font-bold">Brand:</span> {product.brand}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p><span className="font-bold">Stock Available:</span> {product.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
