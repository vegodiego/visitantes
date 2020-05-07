const express = require('express');
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

var schema = mongoose.Schema({
  date: Date,
  name: String
});

var Visitor = mongoose.model("Visitor", schema)


app.get('/', (req, res) => {

	var nombre = "Anónimo"
	if (req.query.name){
		nombre = req.query.name 
	}

	Visitor.create({ date: new Date(), name: nombre}, function(err) {
	  if (err) return console.error(err);
	});

	res.send("El visitante fue almacenado con éxito");
});

app.listen(3000, () => console.log('Listening on port 3000!'));


