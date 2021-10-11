const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

let arrayStudenti = [
	{
		id: 1,
		nome: "Mario",
		cognome: "Rossi",
		eta: 25,
		email: "mario@test.it",
	},
	{
		id: 2,
		nome: "Giuseppe",
		cognome: "Verdi",
		eta: 30,
		email: "giuseppe@test.it",
	},
	{
		id: 3,
		nome: "Giacomo",
		cognome: "Boh",
		eta: 42,
		email: "giacomo@test.it",
	},
];

/** post che aggiunge un nuovo studente nell'array */
app.post("/studenti", (req, res) => {
	/**
	 * tramite spred operator mi costruisco
	 * un nuovo oggetto aggiungedo l'id
	 * */
	const newStudente = { id: 0, ...req.body };
	newStudente.eta = parseInt(newStudente.eta);
	newStudente.id = arrayStudenti[arrayStudenti.length - 1].id + 1;
	arrayStudenti.push(newStudente);
	console.log(arrayStudenti);
	res.json(newStudente.id);
});

/** get che recupera il dettaglio del singolo studente */
app.get("/studenti/:id", (req, res) => {
	const id = req.params.id;
	const studente = arrayStudenti.find((s) => s.id == id);
	if (studente !== null) {
		res.json(studente);
	}
});

/** get che recupera la lista degli studenti */
app.get("/studenti", (req, res) => {
	res.json(arrayStudenti);
});

app.listen(3000, () => console.log("Server listening on port 3000"));
