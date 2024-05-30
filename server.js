const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config({ path: './config.env' });

const signinController = require('./controllers/signinController.js');
const employeesController = require('./controllers/employeesController.js');
const addEmployeeController = require('./controllers/addEmployeeController.js');
const deleteEmployeeController = require('./controllers/deleteEmployeeController.js'); // New import

const app = express();

const pool = require("./db");

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));

app.post("/signin", signinController.signin);
app.post("/add-employee", addEmployeeController.addEmployee)
app.get("/employees", employeesController.getEmployees);
app.delete("/employees/:id", deleteEmployeeController.deleteEmployee); // New route

dotenv.config();

pool.connect((err, client, done) => {
    if (err) {
        console.log('PostgreSQL connection failed: ', err);
    } else {
        console.log('PostgreSQL connection successful');
        done();
    }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
