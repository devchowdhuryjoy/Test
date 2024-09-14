import { Route, Routes } from 'react-router-dom';
import Category from './Components/Category';
import ProductDetails from './Components/ProductDetails'; // Import the new product details page

// import { store } from "./store";
// import { Provider } from "react-redux";
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
// import { productsApi } from "./features/apiSlice";

function App() {
  return (

  //   <Provider store={store}>
  //   <ApiProvider api={productsApi}>
  //     <div className="App">
  //       <Data />
  //     </div>
  //   </ApiProvider>
  // </Provider>
    <div>
      <Routes>
        <Route path="/" element={<Category />} />
        {/* Dynamic route for product details */}
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;


