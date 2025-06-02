import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "Rice", description: "Basmati rice", price: 50 },
  { id: 2, name: "Wheat", description: "Whole wheat", price: 40 },
];
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const role = email.includes("manager") ? "Manager" : "Store Keeper";
    return res.json({
      user: { email, role },
      token: "demo-token",
    });
  }
  res.status(401).json({ message: "Invalid credentials" });
});
app.get("/products", (req, res) => {
  res.json(products);
});
app.post("/products", (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    description,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(5000, () => console.log("API running on http://localhost:5000"));