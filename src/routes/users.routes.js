module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    //Prueba de integracion
    router.post("/login", users.login);

    // Crear un nuevo usuario
    router.post("/", users.create);
  
    // Obtiene todos los usuarios con un nombre de usuario
    router.get("/", users.findAll);
  
    // Obtiene un usuario con el id
    router.get("/:id", users.findOne);
  
    // Actualiza un usuario con el id
    router.put("/:id", users.update);
  
    // Elimina un usuario con el id
    router.delete("/:id", users.delete);
  
    app.use("/api/users", router);
  };
  