import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("role");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(135deg, #6e7cfa, #43a047)",
          color: "#fff",
          padding: { xs: "10px 15px", sm: "10px 30px" },
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Uncomment if you want the Menu Icon */}
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Welcome to ShopEase!
          </Typography>
          {isLoggedIn ? (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ fontSize: { xs: "1rem", sm: "1rem" }, fontWeight: "bold" }}
            >
              Logout{" "}
              <LogoutIcon sx={{ marginLeft: "5px", marginBottom: "1px" }} />
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => navigate("/login")}
              sx={{ fontSize: { xs: "1rem", sm: "1rem" } }}
            >
              Login{" "}
              <LoginIcon sx={{ marginLeft: "3px", marginBottom: "1px" }} />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
