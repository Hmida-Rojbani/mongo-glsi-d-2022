require('./db/connect');
const express = require('express');
const router_course = require('./routers/courses');
const router_author = require('./routers/authors');
const router_user = require('./routers/users');
const auth = require('./middlewares/auth')
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api/courses',router_course);
app.use('/api/authors',auth,router_author);
app.use('/api/users',router_user);


app.listen(port, () => console.log(`Server running on ${port}.`));