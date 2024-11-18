const express = require("express"); // to import the express package
const app = express(); // to create an express application
require("dotenv").config(); // to import the dotenv package

app.use(express.json()); // to parse the incoming requests with JSON payloads

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}); // to start the server

// sample data
let mockdata = [
    { id: 1, name: "Product A", price: 10 },
    { id: 2, name: "Product B", price: 20 },
    { id: 3, name: "Product C", price: 30 },
  ];

// to create a new book
app.post("/mockdata", (req, res) => {
  const { name, price } = req.body; // to get the title and author from the request body
  const newData = { id: mockdata.length + 1, name, price }; // to create a new book object
  mockdata.push(newData); // to add the new book to the books array
  res.status(201).json(newData); // to send the new book as a response
});

// to get all books
app.get("/mockdata", (req, res) => {
  res.json(mockdata); // to send the books array as a response
});

// to get a book by id
app.get("/mockdata/:id", (req, res) => {
  const Data = mockdata.find((b) => b.id === parseInt(req.params.id)); // to find the book by id
  if (!Data) return res.status(404).json({ message: "Data not found" }); // to send a 404 status code and a message if the book is not found
  res.json(Data); // to send the book as a response
});

// to update a book
app.put("/mockdata/:id", (req, res) => {
  const Data = mockdata.find((b) => b.id === parseInt(req.params.id)); // to find the book by id
  if (!Data) return res.status(404).json({ message: "Data not found" }); // to send a 404 status code and a message if the book is not found

  const { name, price } = req.body; // to get the title and author from the request body
  Data.name = name; // to update the title of the book
  Data.price = price; // to update the author of the book
  res.json(Data); // to send the updated book as a response
});

// to delete a book
app.delete("/mockdata/:id", (req, res) => {
  const index = mockdata.findIndex((b) => b.id === parseInt(req.params.id)); // to find the index of the book by id
  if (index === -1) return res.status(404).json({ message: "Book not found" }); // to send a 404 status code and a message if the book is not found

  mockdata.splice(index, 1); // to delete the book from the books array
  res.status(204).send(); // to send a 204 status code
});
