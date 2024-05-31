const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config({ path: './config.env' });

const signinController = require('./controllers/signinController.js');
// admin controllers
const adminEmployeesController = require('./controllers/admin/employeesController.js');
const adminAddEmployeeController = require('./controllers/admin/addEmployeeController.js');
const adminDeleteEmployeeController = require('./controllers/admin/deleteEmployeeController.js');

// librarian controllers
const librarianEmployeesController = require('./controllers/librarian/employeesController.js');
const librarianAddEmployeeController = require('./controllers/librarian/addEmployeeController.js');
const librarianDeleteEmployeeController = require('./controllers/librarian/deleteEmployeeController.js');

// bibliographer controllers
const app = express();

const pool = require("./db");

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));

app.post("/signin", signinController.signin);
app.get("/employees-admin", adminEmployeesController.getEmployees);
app.get("/employees-librarian", librarianEmployeesController.getEmployees);
app.post("/add-employee", adminAddEmployeeController.addEmployee)
app.delete("/employees/:id", adminDeleteEmployeeController.deleteEmployee); 

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
