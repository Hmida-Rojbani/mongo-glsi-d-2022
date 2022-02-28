require('./db/connect');
const express = require('express');
const router_course = require('./routers/courses');
const router_author = require('./routers/authors');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api/courses',router_course);
app.use('/api/authors',router_author);


app.listen(port, () => console.log(`Server running on ${port}.`));