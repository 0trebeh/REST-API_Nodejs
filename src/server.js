const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//inicializaciones
const app = express();

//Middlewares
app.use(cors());
// Analizar la solicitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ruta principal
app.get("/", (req, res) => {
  res.json({ message: "Hola mundo."});
});

//rutas
require("./routes/users.routes")(app);

module.exports = app;