require("dotenv").config(); // Load environment variables

const nodemailer = require("nodemailer");
const db = require("../config/db");

// Ensure required environment variables are present
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO;

if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error("Email credentials are not set in environment variables.");
}

// Configure Nodemailer transport using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Function to send email to the admin
const sendEmailToAdmin = (product) => {
  const mailOptions = {
    from: EMAIL_USER, // Use environment variable for sender
    to: EMAIL_TO, // Admin email address (same for this case)
    subject: "New Product Added", // Email subject
    text: `A new product has been added to the store: ShopEase! \n\nProduct Name: ${product.name}\nPrice: ${product.price} Rs.\nDescription: ${product.description}`, // Email body
  };

  // Send the email to the admin
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// ADD Product API
exports.addProduct = (req, res) => {
  const { name, description, price, seller_id } = req.body;

  // Ensure all required fields are provided
  if (!name || !description || !price || !seller_id) {
    return res.json({ message: "All fields are required" });
  }

  // Insert new product into the database
  db.query(
    "INSERT INTO products (name, description, price, seller_id) VALUES (?, ?, ?, ?)",
    [name, description, price, seller_id],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.json({ error: "Internal server error" });
      }

      // Log product details for debugging
      console.log("Product added:", req.body);

      // Send email notification to admin after successfully adding product
      sendEmailToAdmin({ name, price, description });

      // Return a success message with the new product's ID
      res.json({ message: "Product added", productId: results.insertId });
    }
  );
};

// Fetch Product API
exports.fetchProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.json({ error: err.message });

    console.log("Fetched products:", results);
    res.json(results);
  });
};

// Admin will Approve Product API
exports.approveProduct = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ message: "Product ID is required" });
  }

  db.query(
    "UPDATE products SET status = 'approved' WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.json({ error: err.message });
      console.log(`Product with ID ${id} approved`);
      res.json({ message: "Product approved" });
    }
  );
};

// Approved Product by Admin API, Which will fetch all the approved products and visible to buyers
exports.approveProductList = (req, res) => {
  db.query(
    "SELECT * FROM products where status = 'approved' ",
    (err, results) => {
      if (err) return res.json({ error: err.message });
      console.log(`Approved Products`);
      res.json({ message: "Product approved" });
    }
  );
};
