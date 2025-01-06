// Imports
import { insertData } from './JS_Functions/global_functions.js';
import { fetchFoodData, fetchEducationData, fetchGroceriesData, fetchEntertainmentData, fetchTransportData, selectiveFetch } from './JS_Functions/fetch_functions.js';
import { fetchFoodDataTest } from './JS_Functions/food_functions.js';

// All the onload calls that should be executed once the page loads are kept here
window.onload = () => {
    selectiveRenderCategory();
    selectiveRenderFunction();
}

// Attaching necessary eventListeners to btns & selectors
document.getElementById('function').addEventListener('change', selectiveRenderFunction);
document.getElementById('category').addEventListener('change', selectiveRenderCategory);

// Implement selective table functions render feature
function selectiveRenderFunction(){
    const func = document.getElementById('function').value;

    switch(func){
        case 'insert':
            insertInterface();
            break;
        
        case 'delete':
            deleteInterface();
            break;
    }
}

function insertInterface(){
    const formInterface = document.querySelector(".form-interface");
    formInterface.textContent = '';
    const labels = [
        {label: 'Name: ', inputType: 'text', id: 'product-name', placeholder: 'Name of product'},
        {label: 'Amount: ', inputType: 'number', id: 'amount', placeholder: 'In Rs. '},
        {label: 'Date: ', inputType: 'date', id: 'date'}, 
    ];

    const inputFormatStyling = {
        border: '1px solid black',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        fontSize: '1.2rem',
        margin: '20px',
        padding: '18px 10px',
        justifyContent: 'space-between',
    }

    labels.forEach((label) => {
        const div = document.createElement('div');
        Object.entries(inputFormatStyling).forEach(([key, value]) => {
            div.style[key] = value;
        });

        const formLabel = document.createElement('label');
        formLabel.textContent = label.label;
        div.appendChild(formLabel);

        const inputField = document.createElement('input');
        inputField.type = label.inputType;
        inputField.id = label.id;
        if (label.placeholder != undefined) inputField.placeholder = label.placeholder;
        
        div.appendChild(inputField);
        formInterface.appendChild(div);
    });

    // Creating the Insert Data btn
    const insertBtn = document.createElement('button');
    insertBtn.style.marginBottom = '20px';
    insertBtn.textContent = 'Insert Data';
    insertBtn.addEventListener('click', insertDataOnCategory);
    insertBtn.type = 'button';

    // Appending the Insert Data Btn
    formInterface.appendChild(insertBtn);
}

function deleteInterface(){
    const formInterface = document.querySelector(".form-interface");
    formInterface.textContent = '';

    const divStyle = {
        border: '1px solid black',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1rem',
        margin: '20px',
        padding: '18px 10px',
        justifyContent: 'space-between'
    } 
    
    const div = document.createElement('div');

    const label = document.createElement('label');
    label.textContent = 'Enter the id to delete: ';
    const textInputCell = document.createElement('input');
    const deleteBtn = document.createElement('button');

    deleteBtn.style.marginBottom = '20px';
    deleteBtn.textContent = 'Delete Data';
    deleteBtn.type = "button";
    deleteBtn.addEventListener('click', () => {
        deleteData(textInputCell.value);
        textInputCell.value = '';
    });

    div.appendChild(label);
    div.appendChild(textInputCell);

    Object.entries(divStyle).forEach(([key, value]) => {
        div.style[key] = value;
    });

    formInterface.appendChild(div);
    formInterface.appendChild(deleteBtn);
}

// Implement selective table render feature 
function selectiveRenderCategory(){
    const category = document.getElementById("category").value;
    const fetchDataBtn = document.getElementById("fetch-data-btn");
    const newDataBtn = fetchDataBtn.cloneNode(true); // Cloning our original btn to replace it with the clone to remove all existing eventHandlers at once.

    switch(category){
        case 'food_expense':
           newDataBtn.addEventListener('click', () => fetchFoodData());
           fetchDataBtn.parentNode.replaceChild(newDataBtn, fetchDataBtn);
           break;

        case 'transport_expense':
            newDataBtn.addEventListener('click', () => fetchTransportData());
            fetchDataBtn.parentNode.replaceChild(newDataBtn, fetchDataBtn);
            break;

        case 'education_expense':
            newDataBtn.addEventListener('click', () => fetchEducationData());
            fetchDataBtn.parentNode.replaceChild(newDataBtn, fetchDataBtn);
            break;
        
        case 'entertainment_expense':
            newDataBtn.addEventListener('click', () => fetchEntertainmentData());
            fetchDataBtn.parentNode.replaceChild(newDataBtn, fetchDataBtn);
            break;
        
        case 'groceries_expense':
            newDataBtn.addEventListener('click', () => fetchGroceriesData());
            fetchDataBtn.parentNode.replaceChild(newDataBtn, fetchDataBtn);
            break;
        
        default:
            console.log("Invalid Btn");
            break;
    }
};

// Defining a function insertDataOnCategory() to insert the data of the input fields to the our DB
async function insertDataOnCategory(){
    const category = document.getElementById("category").value;
    const amount = parseInt(document.getElementById("amount").value);
    const entryDate = document.getElementById("date").value;
    const productName = document.getElementById("product-name").value;

    console.table(amount, entryDate, productName);

    await insertData(category, productName, amount, entryDate);
    selectiveFetch(category);

    document.getElementById("amount").value = '';
    document.getElementById("date").value = '';
    document.getElementById("product-name").value = '';
}

async function deleteData(id){
    const category = document.getElementById("category").value;
    try{
        await fetch("http://localhost:5000/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                table_name: category, 
                id: id 
            }),
        });
    } catch(e){
        console.log(e.message);
    }

    selectiveFetch(category); // Selective Fetch to display the updated table after deleting data.
}
