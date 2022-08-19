import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Index Sayfası</h1>");
});

app.listen(port, () => {
  console.log(`Server is up while using port ${port}`);
});
