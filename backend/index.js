const express = require("express");
const cors = require("cors");
const books = require("./books");
const users = require("./users");
const bookie = [
  {
    nomi: "Martin Eden",
    muallif: "Jack London",
    narxi: 123000,
  },
  {
    nomi: "Old man and the sea",
    muallif: "Ernest Hemingway",
    narxi: 133500,
  },
  {
    nomi: "Sherlock Holmes",
    muallif: "Arthur Conan Doyle",
    narxi: 125,
  },
];

function addID(bookie) {
  return bookie.map((i, index) => (i ? { ...i, id: index } : i));
}
let book = addID(bookie);
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", function (request, response) {
  response.send("salom dunyo");
});

app.get("/books", (request, response) => {
  response.send(books);
});

app.get("/users", (request, response) => {
  response.send(users);
});

///get data
app.get("/books", (request, response) => {
  if (!books.length) {
    return response.send({ msg: "books are not found", data: [] });
  }
  response.send({ msg: "Books are found", data: null });
});

//create a new book
app.post("/create", (request, response) => {
  let newBook = request.body;
  newBook.id = book.length;
  if (!newBook.nomi || !newBook.muallif || !newBook.narxi) {
    return response.send({ msg: "ma'lumotlarni toldiring", data: [] });
  }
  book.push(newBook);
  response.send({
    msg: "data is saved",
    data: book,
  });
});

app.get("/create", (req, res) => {
  res.send(book);
});
// delete book

app.delete("/create/:id", (req, res) => {
  let id = req.params.id;
  let index = book.findIndex((i) => i.id === +id);
  book.splice(index, 1);
  res.send({ msg: "book is deleted", data: book });
});

app.put("/create/:id", (req, res) => {
  let newobj = req.body;
  let id = req.params.id;
  let index = book.findIndex((i) => i.id === +id);
  req.body.id = +id;
  console.log(id);
  let update = book.splice(index, 1, newobj);
  res.send({ msg: "book is updated", data: book[id] });
});

let PORT = 5600;
app.listen(PORT, () => {
  console.log(`app is running in http://localhost:${PORT}`);
});

