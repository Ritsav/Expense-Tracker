
export function populateTable(data){
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = "";
    
    // Code for creating the header of food table
    const tableHead = document.querySelector('#data-table thead');
    tableHead.innerHTML = "";
    const tableHeaderRow = document.createElement('tr');
    
    const cell = ["S.N.", "Food", "Amount", "Date"];
    cell.forEach((item) => {
        const cell = document.createElement('th');
        cell.innerHTML = item;

        tableHeaderRow.appendChild(cell);
    });

    tableHead.appendChild(tableHeaderRow);
    
    // Code for creating the table body and adding all data fields extracted using the json data
    data.forEach(item => {
        const row = document.createElement('tr');

        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    document.querySelector("#data-table").style.border = "1px solid black";
    const tdList = document.querySelectorAll('td');
    const thList = document.querySelectorAll('th');

    tdList.forEach((item) => {
        item.style.border = '1px solid black';
    });

    thList.forEach((item) => {
        item.style.border = '1px solid black';
    });
}

export async function insertData(category, productname, amount, entrydate){
    try{
        const response = await fetch("http://localhost:5000/entry", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: category,
                name: productname, 
                amount: amount, 
                date: entrydate
            })
        })
        
        const data = await response.json();
        console.log(data);
    } catch(e){
        console.log(e.message);
    }
}
