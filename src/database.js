const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((d) => {
    console.log("Conectado a la base de datos! en: ", d.connection.host);
  })
  .catch(err => {
    console.log("No se pudo conectar a la base de datos!", err);
    process.exit();
  });