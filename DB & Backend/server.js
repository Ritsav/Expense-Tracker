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
        const groceriesFetch = await pool.query(
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

app.listen(5000, () => {
    console.log('Server has started on PORT: 5000');
});