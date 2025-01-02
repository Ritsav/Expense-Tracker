require('dotenv').config();

// Entry point to the server
const express = require('express');
const pool = require("./db");
const app = express();
const cors = require("cors");

// MiddleWare
app.use(cors());
app.use(express.json());

app.post("/food-entry", async(req, res) => {
    try{
        const {food_name, amount, date} = req.body;
        const newEntry = await pool.query(
            "INSERT INTO foodexpense(food_name, amount, entrydate) VALUES($1, $2, $3) RETURNING *",
            [food_name, amount, date]
        );

        res.json(newEntry.rows);
    } catch(e){
        console.log(e.message);
    }
});

app.get("/food-fetch", async (req, res) => {
    try{
        const foodFetch = await pool.query(
            "SELECT * FROM foodexpense",
        );
        res.json(foodFetch.rows);
    } catch(e){
        console.log(e.message);
    }
});

app.delete("/food-delete", async(req, res) => {
    try{
        const { foodId } = req.body;
        const foodDelete = await pool.query(
            "DELETE FROM foodexpense WHERE foodid=$1",
            [ foodId ]
        );
        res.json(foodDelete.rows);
    } catch(e){
        console.log(e.message);
    }
})

app.post("/transport-entry", async (req, res) => {
    try{   
        const {date, amount} = req.body;
        const newEntry = await pool.query(
            "INSERT INTO transportexpense(date, amount) VALUES($1, $2) RETURNING *",
            [date, amount]
        );

        res.json(newEntry.rows);
    } catch(e){
        console.log(e.message);
    }
});

app.listen(5000, () => {
    console.log('Server has started on PORT: 5000');
});