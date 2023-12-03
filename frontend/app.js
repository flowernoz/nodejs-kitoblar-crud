let API = "http://localhost:5600";
let books = document.getElementById("books");
let form = document.getElementById("form");
let editForm = document.getElementById("editForm");
let closer = document.getElementById("closer");
let modal = document.querySelector(".modal");
function getData() {
  axios
    .get(API + "/create")
    .then((res) => showData(res.data))
    .catch((err) => console.log(err));
}
getData();
function showData(data) {
  data.forEach((item) => {
    let p = document.createElement("p");
    let h2 = document.createElement("h2");
    let b = document.createElement("b");
    let div = document.createElement("div");
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let div1 = document.createElement("div");
    deleteBtn.innerHTML = "Delete";
    editBtn.innerHTML = "Edit";
    div.className = "book-item";
    p.innerHTML = item.nomi;
    h2.innerHTML = item.muallif;
    b.innerHTML = item.narxi + " ming so'm";
    div1.className = "buttons";
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(b);
    div.appendChild(div1);
    div1.appendChild(editBtn);
    div1.appendChild(deleteBtn);

    books.appendChild(div);

    deleteBtn.addEventListener("click", () => {
      console.log(item.id);
      if (confirm("are you sure you want to delete")) {
        axios
          .delete(API + "/create/" + item.id)
          .then((res) => res.statusText === "OK" && window.location.reload())
          .catch((err) => console.log(err));
      }
    });

    let [editmuallif, editnomi, editnarxi] = editForm.children;
    editBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      editnomi.value = item.nomi;
      editmuallif.value = item.muallif;
      editnarxi.value = item.narxi;
      console.log(item.id);
      editForm.onsubmit = (e) => {
        e.preventDefault();
        console.log("ok");
        let edited = {
          nomi: editnomi.value,
          muallif: editmuallif.value,
          narxi: editnarxi.value,
        };
        axios
          .put(API + "/create/" + item.id, edited)
          .then((res) => {
            console.log(res.data, item.id);
            res.statusText === "OK" && window.location.reload();
          })
          .catch((err) => console.log(err));
      };
    });
  });
}

let [muallif, nomi, narxi] = form.children;
form.onsubmit = (e) => {
  e.preventDefault();
  let newBook = {
    nomi: nomi.value,
    muallif: muallif.value,
    narxi: narxi.value,
  };
  axios
    .post(API + "/create", newBook)
    .then((res) => res.statusText === "OK" && window.location.reload())
    .catch((err) => console.log(err));
};

closer.addEventListener("click", () => modal.classList.add("hidden"));
