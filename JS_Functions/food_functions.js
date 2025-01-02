// Imports
import { populateTable } from './global_functions.js';

// When the function is called, it fetches the food table data, parses it and populates the table with food expense data
export async function fetchFoodData(){
    await fetch('http://localhost:5000/food-fetch')
    .then(response => {
        if (response.ok) {
            return response.json(); // Parse the response data as JSON
        } else {
            throw new Error('API request failed!');
        }
    })
    .then(data => {
        // Process the response data here
        console.log(data);
        populateTable(data); // Creating a table with the received json data
    })
    .catch(error => {
        console.error(error); // Logging the error to the console
    });
}

export async function insertFoodData(productName, amount, entryDate){
    try{
        const response = await fetch("http://localhost:5000/food-entry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                food_name: productName, 
                amount: amount, 
                date: entryDate
            })
        })
        
        const data = await response.json();
        console.log(data);
    } catch(e){
        console.log(e);
    }
}
