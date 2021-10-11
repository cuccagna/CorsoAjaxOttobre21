class Nota {
	constructor(id, titolo, nota, dettaglio) {
		this.id = id;
		this.titolo = titolo;
		this.nota = nota;
		this.dettaglio = dettaglio;
		this.data = new Date().toLocaleDateString();
	}
}

module.exports = Nota;
