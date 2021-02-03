import express from "express";
import exphbs from "express-handlebars";
import path from "path";

//initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('.hbs', exphbs({
    extname: '.hbs',
    
}));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routers

//Static Files

//Starting the Server 
app.listen(app.get('port'), () => {
    console.log("Servidor en el puerto: " + app.get('port'));
});