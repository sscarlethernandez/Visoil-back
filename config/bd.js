const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

const conectarDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("BASE DE DATOS CONECTADA");
    } catch (error) {
        console.log(error);
        process.exit(1); //detenemos la app
    }
}

module.exports = conectarDB