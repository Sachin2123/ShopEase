import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const [userNotFound, setUserNotFound] = useState();
  const [userFound, setUserFound] = useState();
  const [admin, setAdmin] = useState();
  const [seller, setSeller] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setUserNotFound("Email and Password are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setUserNotFound("Please enter a valid email.");
      return;
    }

    if (password.length < 3) {
      setUserNotFound("Password must be at least 3 characters long.");
      return;
    }

    login({ email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);
        localStorage.setItem("role", response.data.role);
        console.log("response:- ", response);

        if (response.data.role === "admin") {
          setAdmin(response.data.role);
          setUserFound(response.status);

          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome Admin!",
            confirmButtonText: "Proceed",
          }).then(() => {
            navigate("/admin");
          });
        } else if (response.data.role === "seller") {
          setUserFound(response.status);
          setSeller(response.data.role);

          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome Seller!",
            confirmButtonText: "Proceed",
          }).then(() => {
            navigate("/seller");
          });
        } else {
          console.log("Role is not admin or seller.");
        }
      })
      .catch((error) => {
        console.error("Login failed:- ", error);
        if (error.response) {
          setUserNotFound(error.response.data);
        } else {
          console.log("Axios Error:", error.message);
        }
      });
  };

  const handlePassToggle = () => {
    setHide(!hide);
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6e7cfa, #43a047)",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper
          elevation={16}
          sx={{
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#fff",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              marginBottom: "1.5rem",
              fontWeight: "bold",
              color: "#1976d2",
            }}
          >
            Welcome Back
          </Typography>
          {userNotFound && (
            <Typography variant="body1" color="error" align="center">
              {userNotFound}
            </Typography>
          )}
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <AccountCircleIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              marginBottom: "1.5rem",
            }}
          />
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type={hide ? "password" : "text"}
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePassToggle} edge="end">
                    {hide ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              marginBottom: "1.5rem",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "10px",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              marginTop: "1rem",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
            onClick={handleSubmit}
          >
            {userFound === 200 ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              padding: "10px",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              marginTop: "1rem",
              borderColor: "#1976d2",
              color: "#1976d2",
              "&:hover": {
                backgroundColor: "#1976d2",
                color: "#fff",
              },
            }}
            onClick={navigateToHome}
          >
            Home
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
