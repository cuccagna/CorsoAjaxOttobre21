const Nota = require("./classes/nota");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

let note = [
	new Nota(1, "test1", "testNota1", "testDettaglio1"),
	new Nota(2, "test2", "testNota2", "testDettaglio2"),
	new Nota(3, "test3", "testNota3", "testDettaglio3"),
];

app.use(cors());
app.use(bodyParser.json());

app.get("/note", (req, res) => {
	res.json(note);
});

app.get("/note/:id", (req, res) => {
	const id = req.params.id;
	const nota = note.find((n) => n.id == id);

	res.json(nota);
});

app.post("/note", (req, res) => {
	const id = note.length ? note[note.length - 1].id + 1 : 1;
	let nuovaNota = req.body;
	nuovaNota.id = id;
	note.push(nuovaNota);
	console.log(note);
	res.json(nuovaNota);
});

app.put("/note/:id", (req, res) => {
	const id = req.params.id;
	const index = note.findIndex((n) => n.id == id);
	note.splice(index, 1, req.body);
	res.json(req.body);
});

app.delete("/note/:id", (req, res) => {
	const previousLength = note.length;
	const id = req.params.id;
	note = note.filter((n) => n.id != id);
	const currentLength = note.length;
	if (currentLength < previousLength) {
		res.json(`La nota con id ${id} è stata eliminata correttamente`);
	} else {
		res.json("Si è verificato un errore");
	}
});

app.listen(3000, () => console.log("Server listening on port 3000"));


