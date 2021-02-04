const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/config"); 

//inicializaciones
const app = express();

var corsOptions = {
  origin: "http://localhost:4000"
};

//Middlewares
app.use(cors(corsOptions));
// Analizar la solicitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ruta principal
app.get("/", (req, res) => {
  res.json({ message: "Hola mundo." });
});

//rutas
require("./src/routes/users.routes")(app);
//app.use('/api/users', require('./src/routes/users.routes'));

