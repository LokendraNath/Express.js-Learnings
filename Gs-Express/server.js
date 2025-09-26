import express from "express";
const app = express();

//* Middleware
app.use(express.json());
//code का कोई भी अनकंट्रोल्ड error पकड़ना।
process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});
//बिना .catch() वाला promise rejection पकड़ना।
process.on("unhandledRejection", (reason, promise) => {
  console.log(reason);
});

//* Simple Route
app.get("/", (req, res) => {
  res.send("Hello");
});

// Synchornouse Error
app.get("/sync-err", (req, res, next) => {
  try {
    throw new Error("Something went wrong");
  } catch (error) {
    next(error);
  }
});

// Asynchronouse Error
app.get("/async-err", async (req, res, next) => {
  try {
    await Promise.reject(new Error("Async error occured"));
  } catch (error) {
    next(error);
  }
});

// Global Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  console.log(err.stack);
  res.status(500).json({ msg: err.message });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listining on Port ${PORT}`));
