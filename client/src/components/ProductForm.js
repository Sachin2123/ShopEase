import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { ShoppingCart } from "lucide-react";
import Swal from "sweetalert2";

const ProductForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const seller_id = 3;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSubmit({ name, price, description, seller_id });

      Swal.fire({
        icon: "success",
        title: "Product Added",
        text: "Your product has been successfully added!",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to add the product. Please try again.",
      });
    }
  };

  const email = localStorage.getItem("email");
  const Name = email
    ? email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1)
    : "";

  return (
    <Box
      component="form"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f7fc",
        padding: "2rem",
      }}
      onSubmit={handleSubmit}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: 600 }}
      >
        <Grid item xs={12}>
          <Paper
            elevation={12}
            sx={{
              padding: "2rem",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 12px 48px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              Seller Dashboard
            </Typography>

            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                color: "#424242",
                marginBottom: "1rem",
              }}
            >
              Welcome, <strong>{Name}</strong>
            </Typography>

            <Divider sx={{ marginBottom: "1.5rem" }} />

            {/* Product Name Input */}
            <TextField
              label="Product Name"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />

            <TextField
              label="Price"
              variant="outlined"
              margin="normal"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />

            <TextField
              multiline
              label="Description"
              variant="outlined"
              margin="normal"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />

            <Box sx={{ marginTop: "2rem", textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  padding: "10px 30px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "8px",
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Add Product
                <span
                  style={{
                    marginLeft: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ShoppingCart size={20} />
                </span>
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductForm;
