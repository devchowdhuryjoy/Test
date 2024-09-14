import { useNavigate } from 'react-router-dom';
import { Input, Button, Pagination } from 'antd';
import { useState } from 'react';

const { Search } = Input;

function Product({ products }) {
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search input
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // State for selected product details
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page
  const [pageSize] = useState<number>(4); // Products per page
  const navigate = useNavigate(); // Hook to navigate to a different route

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate products
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle search input
  const onSearch = (value: string) => {
    setSearchTerm(value); // Set the search term from the input
    setCurrentPage(1); // Reset to page 1 after searching
  };

  // Handle product details button click
  const handleProductDetails = (product: any) => {
    setSelectedProduct(product); // Set the selected product for detailed view
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Render product details if a product is selected
  const renderProductDetails = () => {
    if (!selectedProduct) return null;

    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border border-gray-300 shadow-lg rounded-lg p-8 w-full max-w-md bg-white">
          <h2 className="text-2xl font-bold text-center mb-4">Product Details</h2>
          <div className="flex justify-center mb-4">
            <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="w-48 h-48 object-cover rounded-md" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Title: {selectedProduct.title}</h3>
          <p className="text-gray-700 mb-2">Category: {selectedProduct.category}</p>
          <p className="text-gray-700 mb-2">Price: ${selectedProduct.price}</p>
          <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
          <div className="flex justify-center">
            <button
              onClick={() => setSelectedProduct(null)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8">
      {/* Search Input */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-6">ALL PRODUCT DATA</h2>
        <div className="max-w-lg mx-auto">
          <Search
            placeholder="Search products"
            enterButton="Search"
            size="large"
            onSearch={onSearch} // Trigger search when button clicked
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
        </div>
      </div>

      {/* Show either product details or product list */}
      {selectedProduct ? (
        renderProductDetails()
      ) : paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="border border-black p-5 rounded">
              <div className="flex justify-center mb-4">
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  type="primary"
                  onClick={() => handleProductDetails(product)}
                >
                  Product Details
                </Button>
              </div>
              <div className="flex justify-center">
                <img src={product.thumbnail} alt={product.title} className="w-38 h-38 object-cover" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mt-4">Title: {product.title}</h3>
                <p className="text-gray-700">Category: {product.category}</p>
                <p className="text-gray-700">Price: ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-8">No products found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredProducts.length}
          onChange={handlePageChange}
          showSizeChanger={false} // Optional: disable page size change
        />
      </div>
    </div>
  );
}

export default Product;
