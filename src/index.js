const server = require('./server');
const config = require("./config/config"); 

server.listen(config.PORT, () => {
    console.log('Server in port: ' + config.PORT);
});