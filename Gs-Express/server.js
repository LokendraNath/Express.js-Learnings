import express from "express";
const app = express();

//* Middleware
app.use(express.json());

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

//* GET ALL PRODUCT
app.get("/api/products", (req, res) => {
  const products = [
    { id: 1, name: "Glass", price: 45999 },
    { id: 2, name: "Computer", price: 46999 },
    { id: 3, name: "Setelite", price: 65999 },
  ];
  res.status(200).json({ products });
});

//* GET ON PRODUCT
app.get("/api/products/:id", (req, res) => {
  const products = [
    { id: 1, name: "Glass", price: 45999 },
    { id: 2, name: "Computer", price: 46999 },
    { id: 3, name: "Setelite", price: 65999 },
  ];
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(400).json({ msg: "Product Not Found" });
  }
  res.status(200).json(product);
});

//* CREATE A NEW PRODUCT
app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  newProduct.id = Date.now();
  res.status(200).json(newProduct);
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listining on Port ${PORT}`));
