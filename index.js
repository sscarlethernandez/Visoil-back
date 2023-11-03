const express = require('express'); 
const conectarDB = require('./config/bd'); 
const cors = require("cors"); 

const app = express(); 

conectarDB(); 

app.use(cors())

app.use(express.json()); 

app.use('/visoil', require('./routes/Routes')); 


app.listen(4000, ()=>{
    console.log("EL SERVIDOR ESTA CORRIENDO PERFECTAMENTE"); 
})