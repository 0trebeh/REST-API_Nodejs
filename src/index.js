const express = require("express");
const morgan = require("morgan");

//initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routers
app.use(require('./routes'));
app.use('/api/users', require('./routes/users'));

//Starting the Server 
app.listen(app.get('port'), () => {
    console.log("Servidor en el puerto: " + app.get('port'));
});