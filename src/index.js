const app = require('./server');
require('./database'); 
const config = require("./config/config"); 

// iniciar el servidor
app.listen(config.PORT, () => {
    console.log('El servidor esta corriendo en el puerto: ' + config.PORT);
});