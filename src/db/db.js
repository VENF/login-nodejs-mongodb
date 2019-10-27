const mongoose = require('mongoose');
module.exports = {
    connectionDataBase: () => {
        mongoose.connect('mongodb://localhost/login',{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
            .then(db => console.log('db is connected'))
            .catch(error => console.log(error))
    }
}