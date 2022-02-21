const mongoose = require('mongoose');
//mongodb://localhost:27017/dbName
mongoose
.connect('mongodb+srv://user:1234@db.mhbax.mongodb.net/glsi-d-2022?retryWrites=true&w=majority')
.then(()=> console.log('Mongo is Up.'))
.catch(err => console.log('Mongo is Down, raison :', err.message));