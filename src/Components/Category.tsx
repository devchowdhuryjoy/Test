import { useEffect, useState } from 'react';
import Product from './Product';

function Category() {
  const [products, setProducts] = useState<any[]>([]); // All products
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Selected category
  const [categories, setCategories] = useState<string[]>([]); // All unique categories

  useEffect(() => {
    // Fetch all products
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        const allProducts = data.products || [];

        // Set products in state
        setProducts(allProducts);

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(allProducts.map((product) => product.category)));
        setCategories(uniqueCategories);
        

      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category); // Set the selected category
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="flex flex-col md:flex-row p-5">
      {/* Sidebar for categories */}
      <div className="w-full md:w-[20%] text-xl font-bold p-5 md:p-10 mb-5 md:mb-0">
        <h3 className="text-lg mb-4">Categories:</h3>
        {categories.map((category) => (
          <div className='flex justify-between items-center' key={category}>
            <p
              className={`font-semibold text-base capitalize mb-2 p-2 cursor-pointer transition duration-300 ease-in-out ${
                category === selectedCategory ? 'text-blue-500' : 'hover:text-blue-400'
              }`}
              onClick={() => handleCategoryClick(category)} // Set the selected category on click
            >
              {category}
            </p>
          </div>
        ))}
      </div>

      {/* Display products in the selected category */}
      <div className="w-full md:w-[80%]">
        <Product products={filteredProducts} />
      </div>
    </div>
  );
}

export default Category;
