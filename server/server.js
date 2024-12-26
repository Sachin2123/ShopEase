const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
