// Imports
import { populateTable } from './global_functions.js';

// Just a test Function for now
export async function fetchFoodDataTest(){
    await fetch('http://localhost:5000/food-graph-fetch')
    .then(response => {
        if(response.ok){
            return response.json(); // Parse the response data as JSON
        } else{
        throw new Error('Api request failed!');
        }
    })
    .then(data => {
        console.log(data);
        drawBarGraph(data);
    });
}

export function drawBarGraph(data){
    // array declarations for date and amount
    const amount = [];
    const date = [];

    data.forEach((item) => {
        amount.push(item.amount);
        date.push(new Date(item.date).getFullYear()); // transform json string to date object and only get it's year
    });
    console.log(date);
    console.log(amount);

    new Chart("myChart", {
        type: "bar",
        data: {
            labels: date,
            datasets: [{
                data: amount,
                backgroundColor: "red",
            }]
        }
    });
}
