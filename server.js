const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config({ path: './config.env' });

// all controllers
const signinController = require('./controllers/signinController.js');
const addEmployeeController = require('./controllers/addEmployeeController.js');
const deleteEmployeeController = require('./controllers/admin/deleteEmployeeController.js');

// admin controllers
const adminEmployeesController = require('./controllers/admin/employeesController.js');

// librarian controllers
const librarianEmployeesController = require('./controllers/librarian/employeesController.js');
const formularsController = require('./controllers/librarian/formularsController.js');
const deleteFormularController = require('./controllers/librarian/deleteFormularController.js');

// bibliographer controllers
const app = express();

const pool = require("./db");

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));

// GET
app.get("/employees-admin", adminEmployeesController.getEmployees);
app.get("/employees-librarian", librarianEmployeesController.getEmployees);
app.get("/formulars", formularsController.getFormulars);

// POST
app.post("/signin", signinController.signin);
app.post("/add-employee", addEmployeeController.addEmployee);

// DELETE
app.delete("/employees/:id", deleteEmployeeController.deleteEmployee); 
app.delete('/formulars/:id', deleteFormularController.deleteFormular);

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
