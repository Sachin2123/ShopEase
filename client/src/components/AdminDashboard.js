import React, { useEffect, useState } from "react";
import { fetchProducts, approveProduct } from "../services/api";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Snackbar,
  useTheme,
  createTheme,
  ThemeProvider,
  Divider,
} from "@mui/material";
import { Alert } from "@mui/material";
import { red, green, blue, orange, yellow } from "@mui/material/colors";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await fetchProducts();
        setProducts(result.data);
      } catch (error) {
        setSnackbarMessage("Failed to load products");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      setSnackbarMessage("Product approved successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      setSnackbarMessage("Failed to approve product");
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  // Custom theme for a vibrant, colorful eCommerce feel
  const customTheme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: orange[500],
      },
      success: {
        main: green[500],
      },
      error: {
        main: red[500],
      },
      warning: {
        main: yellow[700],
      },
      background: {
        default: "#f4f7fc",
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h4: {
        fontWeight: 700,
        fontSize: "2rem",
        color: blue[700],
      },
      body1: {
        color: "#333",
        fontSize: "1rem",
        lineHeight: 1.5,
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "background.default",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "30px" }} gutterBottom>
          Admin Dashboard
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress color="primary" size={60} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {products
              .sort((a, b) => (a.status === "pending" ? -1 : 1))
              .map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  {/* {console.log(product)} */}
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 4,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 8,
                        cursor: "pointer",
                      },
                      background:
                        product.status === "approved" ? green[50] : blue[50],
                    }}
                  >
                    <CardContent
                      sx={{
                        padding: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" color="text.secondary" paragraph>
                        Product :- {product.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        paragraph
                      >
                        Price:{" "}
                        {product.price.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}{" "}
                        Rs.
                      </Typography>
                      {/* <Typography variant="h6" gutterBottom>
                        description :- {product.description}
                      </Typography> */}
                      <Divider />
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        paragraph
                        sx={{ marginTop: "13px" }}
                      >
                        Status:{" "}
                        <span
                          style={{
                            color:
                              product.status === "approved"
                                ? green[700]
                                : red[700],
                          }}
                        >
                          {product.status}
                        </span>
                      </Typography>
                      <Button
                        variant="contained"
                        color={
                          product.status === "approved"
                            ? "success"
                            : "secondary"
                        }
                        onClick={() => handleApprove(product.id)}
                        disabled={product.status === "approved"}
                        sx={{
                          marginTop: 2,
                          fontWeight: "bold",
                          borderRadius: "30px",
                          padding: "10px 20px",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor:
                              product.status === "approved"
                                ? green[700]
                                : orange[700],
                          },
                        }}
                      >
                        {product.status === "approved"
                          ? `${product.name} Approved`
                          : "Approve"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;
