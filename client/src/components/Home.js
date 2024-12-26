import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { fetchProducts } from "../services/api"; // Assuming you have this API function

const Home = () => {
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch approved products from the backend API
    const getApprovedProducts = async () => {
      try {
        const response = await fetchProducts(); // Assuming this fetches all products
        const products = response.data.filter(
          (product) => product.status === "approved"
        ); // Filter approved products
        setApprovedProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getApprovedProducts();
  }, []);

  return (
    <Box>
      {/* Featured Products Section */}
      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 8,
            marginTop: 4,
          }}
        >
          Featured Products
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h6">Loading products...</Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {approvedProducts.length > 0 ? (
              approvedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        product.image ||
                        `https://source.unsplash.com/300x200/?product-${product.id}`
                      }
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {/* {product.description} */}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2, width: "100%" }}
                      >
                        Buy Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" color="text.secondary" align="center">
                  No approved products available.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Box>

      {/* Categories Section */}
      {/* <Box sx={{ backgroundColor: "#f5f5f5", padding: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 4 }}
        >
          Shop by Categories
        </Typography>
        <Grid container spacing={4}>
          {["Electronics", "Fashion", "Home Appliances", "Beauty Products"].map(
            (category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://source.unsplash.com/300x200/?${category}`}
                    alt={category}
                  />
                  <CardContent>
                    <Typography variant="h6">{category}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </Box> */}
    </Box>
  );
};

export default Home;
