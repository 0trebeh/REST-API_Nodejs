const db = require("../models");
const User = db.users;

// Crear y guardar un nuevo usuario
exports.create = (req, res) => {
  // Validar solicitud (aqui por ahora solo el nombre)
  if (!req.body.name) {
    res.status(400).send({ message: "El nombre no puede estar vacío!" });
    return;
  }

  // Crear un nuevo usuario
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  // Guardar usuario en la db
  user.save(user)
    .then(data => { res.send(data)})
    .catch(err => { res.status(500).send({
        message: err.message || "Se produjo un error al crear el usuario."
      });
    });
};

// Recuperar todos los usuarios por username en la base de datos.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};

  User.find(condition)
    .then(data => { res.send(data) })
    .catch(err => { res.status(500).send({
        message: err.message || "Se produjo un error al recuperar los usuarios."
      });
    });
};

// Encuentra un solo usuario con un id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Usuario no encontrado con id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error al recuperar el usuario con id: " + id });
    });
};

// Actualizar un user por el id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Los datos para actualizar no pueden estar vacíos!"
    });
  }

  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede actualizar el usuario con id = ${id}. Quizás no se encontró el usuario!`
        });
      } else res.send({ message: "El usuario se actualizó correctamente." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el usuario con el id: " + id
      });
    });
};

// Eliminar un usuario con el id de la solicitud
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede eliminar el usuario con id = ${id}. Quizás no se encontró el usuario!`
        });
      } else {
        res.send({
          message: "El Usuario se eliminó correctamentes!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "No se pudo eliminar el usuario con id: " + id });
    });
};