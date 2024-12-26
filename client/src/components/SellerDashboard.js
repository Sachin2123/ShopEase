import React from "react";
import { addProduct } from "../services/api";
import ProductForm from "./ProductForm";
import { Box } from "@mui/material";

const SellerDashboard = () => {
  const handleSubmit = async (product) => {
    console.log("product:- ", product);
    await addProduct(product);
  };

  return (
    <Box>
      <ProductForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default SellerDashboard;
