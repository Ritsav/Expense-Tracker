require('dotenv').config();

// Entry point to the server
const express = require('express');
const pool = require("./db");
const app = express();
const cors = require("cors");

// MiddleWare
app.use(cors());
app.use(express.json());

// Post Methods
app.post("/entry", async(req, res) => {
    try{
        const {category, name, amount, date} = req.body;
        const newEntry = await pool.query(
            `INSERT INTO ${category}(name, amount, date) VALUES($1, $2, $3) RETURNING *`,
            [name, amount, date]
        );

        res.json(newEntry.rows);
    } catch(e){
        console.log(e.message);
    }
});

// Get Methods
app.get("/food-fetch", async (req, res) => {
    try{
        const foodFetch = await pool.query(
            "SELECT * FROM food_expense",
        );
        res.json(foodFetch.rows);
    } catch(e){
        console.log(e.message);
    }
});

app.get("/transport-fetch", async(req, res) => {
    try{
        const transportFetch = await pool.query(
            "SELECT * FROM transport_expense",
        );
        res.json(transportFetch.rows);
    } catch(e){
        console.log(e.message);
    }
});

app.get("/entertainment-fetch", async(req, res) => {
    try{
        const entertainFetch = await pool.query(
            "SELECT * FROM entertainment_expense",
        );
        res.json(entertainFetch.rows);
    } catch(e){
        console.log(e.message);
    }
});

app.get("/education-fetch", async(req, res) => {
    try{
        const educationFetch = await pool.query(
            "SELECT * FROM education_expense",
        );
        res.json(educationFetch.rows);
    } catch(e){
        console.log(e.message);
    }
});

app.get("/groceries-fetch", async(req, res) => {
    try{
        const groceriesFetch = await pool.query(
            "SELECT * FROM groceries_expense",
        );
        res.json(groceriesFetch.rows);
    } catch(e){
        console.log(e.message);
    }
});

// Delete Methods
app.delete("/delete", async(req, res) => {
    try{
        const { table_name, id } = req.body;
        const foodDelete = await pool.query(
            `DELETE FROM ${table_name} WHERE id=$1`,
            [ id ]
        );
        res.json(foodDelete.rows);
    } catch(e){
        console.log(e.message);
    }
});



// Test Methods
// Implement a method that can query search expenses of only a particular year and draw graphs for it
// 1. Firstly, implement search query for database 
app.post('/search', async(req, res) => {
    try{
        const table_name = 'food_expense';
        const { value } = req.body;
        const searchEntries = await pool.query(
            `SELECT * FROM ${table_name} WHERE name ILIKE $1`, // ILIKE Implements case-insensitive searching in postgres
            [ `${value}%` ]
        );
        res.json(searchEntries.rows);
    } catch(e){
        console.log(e.message);
    }
});

// 2. filter year/amount greater than or less than queries



// 3. use such functions to get neccessary data and draw appropriate graphs
app.get("/graph-fetch", async(req, res) => {
    try{
        const foodAmountFetch = await pool.query(
            'SELECT amount, date FROM food_expense'
        );
        res.json(foodAmountFetch.rows);
    } catch(e){
        console.log(e.message);
    }
});

app.listen(5000, () => {
    console.log('Server has started on PORT: 5000');
});