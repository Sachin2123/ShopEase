import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (credentials) => {
  console.log("credentials :- ", credentials);
  return api.post("/login", credentials);
};

export const fetchProducts = async () => {
  return api.get("/products");
};

export const approveProductList = async () => {
  return api.get(`/products_approve`);
};

export const addProduct = async (product) => {
  return api.post("/products", product);
};

export const approveProduct = async (id) => {
  return api.put(`/products/${id}/approve`);
};

export const rejectProduct = async (id) => {
  return api.put(`/products/${id}/reject`);
};
