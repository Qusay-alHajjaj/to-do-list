const express = require('express');
const mongoose = require('mongoose');
const taskRoutes =   require('./routes/taskroutes');
const app = express();
const port = 3000
app.use(express.json());
mongoose.connect("mongodb://admin:admin@localhost:27017/todo?authSource=admin") 
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));
const db = mongoose.connection;
db.on('error', (error) => {console.error(error)});
app.use(taskRoutes);
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})