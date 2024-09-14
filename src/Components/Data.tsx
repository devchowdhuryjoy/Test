import { ImPhone } from "react-icons/im";
import {
    useGetAllProductsQuery,
    useGetProductQuery,
  } from "../Feature/ApiSlice";
  export const Data = () => {
    const {
      data: allProductsData,
      
      isLoading,
    } = useGetAllProductsQuery(ImPhone);
    const { data: singleProductData } = useGetProductQuery("Apple");
  
    console.log(allProductsData);
    console.log(singleProductData);
  
    if (isLoading) return <h1> Loading...</h1>;
    return <div> Data: </div>;
  };
  