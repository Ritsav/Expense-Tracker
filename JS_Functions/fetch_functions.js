import { populateTable } from "./global_functions.js";

// when the function is called, it fetches the food table data, parses it and populates the table with food expense data
export async function fetchFoodData(){
    await fetch('http://localhost:5000/food-fetch')
    .then(response => {
        if (response.ok) {
            return response.json(); // parse the response data as json
        } else {
            throw new error('api request failed!');
        }
    })
    .then(data => {
        // process the response data here
        console.log(data);
        populateTable(data); // creating a table with the received json data
    })
    .catch(error => {
        console.error(error); // logging the error to the console
    });
}

export async function fetchTransportData(){
    await fetch('http://localhost:5000/transport-fetch')
    .then(response => {
        if (response.ok) {
            return response.json(); // parse the response data as json
        } else {
            throw new error('api request failed!');
        }
    })
    .then(data => {
        // process the response data here
        console.log(data);
        populateTable(data); // creating a table with the received json data
    })
    .catch(error => {
        console.error(error); // logging the error to the console
    });
}

export async function fetchEducationData(){
    await fetch('http://localhost:5000/education-fetch')
    .then(response => {
        if (response.ok) {
            return response.json(); // parse the response data as json
        } else {
            throw new error('api request failed!');
        }
    })
    .then(data => {
        // process the response data here
        console.log(data);
        populateTable(data); // creating a table with the received json data
    })
    .catch(error => {
        console.error(error); // logging the error to the console
    });
}

export async function fetchEntertainmentData(){
    await fetch('http://localhost:5000/entertainment-fetch')
    .then(response => {
        if (response.ok) {
            return response.json(); // parse the response data as json
        } else {
            throw new error('api request failed!');
        }
    })
    .then(data => {
        // process the response data here
        console.log(data);
        populateTable(data); // creating a table with the received json data
    })
    .catch(error => {
        console.error(error); // logging the error to the console
    });
}

export async function fetchGroceriesData(){
    await fetch('http://localhost:5000/groceries-fetch')
    .then(response => {
        if (response.ok) {
            return response.json(); // parse the response data as json
        } else {
            throw new error('api request failed!');
        }
    })
    .then(data => {
        // process the response data here
        console.log(data);
        populateTable(data); // creating a table with the received json data
    })
    .catch(error => {
        console.error(error); // logging the error to the console
    });
}

export function selectiveFetch(category){
    switch(category){
        case 'food_expense':
            fetchFoodData();
            break;
        
        case 'transport_expense':
            fetchTransportData();
            break;
        
        case 'education_expense':
            fetchTransportData();
            break;

        case 'entertainment_expense':
            fetchEntertainmentData();
            break;
        
        case 'groceries_expense':
            fetchGroceriesData();
            break;
        
        default:
            console.log("Invalid Btn Value!");
            break;
    }
}